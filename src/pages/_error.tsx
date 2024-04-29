import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import Container from '~/components/layout/Container'
import PortableImage from '~/components/PortableImage'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import styles from '~/styles/notFound.module.css';
import { urlForImage } from '~/lib/sanity.image'
import {
  pageSlugsQuery,
  getContentBySlug,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

import localFont from 'next/font/local';
const myFont = localFont({ src: '../styles/fonts/Neonsign-Regular.woff' });

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    page: any
  },
  Query
> = async ({ draftMode = false, params }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const page = await getContentBySlug(client, 'page', 'not-found');

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      page
    },
  }
}

export default function ErrorRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {

  return (
    <>
      {props.page ? (
        <PortableText value={props.page.body} components={{ types: { image: PortableImage } }} />
      ) : (
        <section className={styles.notFoundContainer}>
          <h1 className={myFont.className}>404</h1>
          <p className={myFont.className}>Page Not Found</p>
        </section>
      )}
    </>
  )
}