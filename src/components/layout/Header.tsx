import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getGlobalByTitle, getPages, getSubmenuItems } from '~/lib/sanity.queries'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from '~/styles/components/header.module.css';
import { isCSR } from '~/utils'
import globalSlice, { setIsMobile } from '~/stores/global/globalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/stores/store'
import FacebookLogo from '../icons/FacebookLogo'
import WhatsappLogo from '../icons/WhatsappLogo'
import InstagramLogo from '../icons/InstagramLogo'

export interface HeaderStaticProps {
  draftMode: boolean
  token?: string
  pages: Array<any>
}

export const getStaticProps: GetStaticProps<any> = async ({ draftMode = false }) => {
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export default function Header(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const dispatch = useDispatch();
  const [headerData, setHeaderData] = useState<any>({});
  const isMobile = useSelector((state: RootState) => state.global.isMobile);
  // const isMobile = false;
  const [menuItems, setMenuItems] = useState([]);
  const client = getClient(props.draftMode ? { token: readToken } : undefined);

  const fetchData = async () => {
    const pages = await Promise.all((await getPages(client)).map(async (page) => {
      if (!page.submenus) return page;
      const subItems = await getSubmenuItems(client, page.submenusOrigin);
      return { ...page, subItems };
    }));
    const data = await getGlobalByTitle(client, 'header');
    console.log('Header Data ::: ', { pages, data });
    setHeaderData(data);
    setMenuItems(pages);
  };

  useEffect(() => {
    setSubmenuPositions();
  }, [menuItems]);

  const setSubmenuPositions = () => {
    const elements = document.querySelectorAll(`.${styles.submenu}`);
    elements.forEach((element: HTMLElement) => {
      if(element.offsetWidth + element.parentElement.offsetLeft >= window.innerWidth) {
        element.style.right = '0px';
        element.style.left = 'auto';
      } else {
        element.style.left = '0px';
        element.style.right = 'auto';
      }
    });
  };

  // const handleSocialMedia = (socialMediaURL) => {
  //   console.log('Social Media :::: ', socialMediaURL);
  // };

  useEffect(() => {
    addResizeListener();
    addScrollListener();
    fetchData();

    return () => {
      removeEventListener('resize', addResizeListener);
      removeEventListener('scroll', addScrollListener);
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addScrollListener = () => {
    const menu = document.getElementById('header');
    const pageContainer = document.getElementsByTagName('main')[0];

    return window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        menu.style.position = 'fixed';
        menu.style.width = '100%';
        menu.style.left = '0';
        pageContainer.style.marginTop = '98px';
      } else {
        menu.style.position = 'relative';
        pageContainer.style.marginTop = '0';
      }
    });
  };
  const addResizeListener = () => {
    return window.addEventListener('resize', () => {

      const isMobile = window.innerWidth < 768;
      dispatch(setIsMobile(isMobile));
    });
  };


  const toggleMenu = (e) => {
    // e.stopPropagation();
    // const overflow = !isMenuOpen ? 'hidden' : 'auto';
    // document.body.style.overflow = overflow;
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.navbar} id="header">
      <a href="#" className={styles.logo}>NEPUNAH</a>
      <div className={`${styles.menuToggle} ${isMenuOpen ? styles.toggleActive : ''}`} onClick={toggleMenu}></div>
      <nav className={`${isMenuOpen ? styles.openedNav : ''}`}>
        <ul className={styles.menu}>
        {menuItems.map((page, index) => !page.submenus ? (
            <li>
              <Link href={`/${page.slug.current}`} className={styles['menu-link']} replace>{page.title}</Link>
            </li>
          ) : (
            <li className={`${styles['has-dropdown']}`}>
              <span className={styles['menu-link']}>
                {page.title}
                <span className={styles['arrow']}></span>
              </span>
              <ul className={styles.submenu}>
                {page.subItems.map((submenu) => (
                  <li>
                    <Link href={`/${page.slug.current}/${submenu.slug.current}`} className={styles['menu-link']} replace>{submenu.title}</Link>
                  </li>))}
              </ul>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <a href="https://wa.me/+5511978619327" target='_blank'>
              <WhatsappLogo />
            </a>
          </li>
          <li>
            <a href="https://facebook.com/nepunah" target='_blank'>
              <FacebookLogo width="50px" height="50px" />
            </a>
          </li>
          <li>
          <a href="https://instagram.com/nepunah" target='_blank'>
            <InstagramLogo />
          </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

