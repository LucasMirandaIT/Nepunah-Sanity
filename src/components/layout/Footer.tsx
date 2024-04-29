import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getGlobalByTitle, getPages, getSubmenuItems } from '~/lib/sanity.queries'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '~/styles/components/footer.module.css';

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

export default function Footer(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [footerData, setFooterData] = useState<any>({});
  const fetchData = async () => {
    const client = getClient(props.draftMode ? { token: readToken } : undefined);

    const data = await getGlobalByTitle(client, 'footer');
    console.log('Footer Data ::: ', {data});
    setFooterData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className={styles["footer-container"]}>
      <footer className={styles.footer}>
        <p className={styles["footer-text"]}>
          {footerData.appTitle}
        </p>
      </footer>
    </section>
  )
}

