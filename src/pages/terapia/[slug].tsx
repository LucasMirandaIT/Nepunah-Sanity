import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/layout/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getTherapy,
  therapySlugsQuery,
  type Therapy,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
import PortableImage from '~/components/PortableImage'
import styles from '~/styles/pages/pages.module.css';

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    therapy: Therapy
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const therapy = await getTherapy(client, params.slug)

  if (!therapy) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      therapy,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {

  return (
    <Container>
      <div className={styles.body}>
        <PortableText value={props.therapy.body} components={{ types: { image: PortableImage } }} />
      </div>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(therapySlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/terapia/${slug}`) || [],
    fallback: 'blocking',
  }
}
