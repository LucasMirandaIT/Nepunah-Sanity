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
  getContentBySlug,
  ReflectionText,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    reflectionText: ReflectionText
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const reflectionText = await getContentBySlug(client, 'reflection-text', params.slug) as ReflectionText;

  if (!reflectionText) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      reflectionText,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {

  return (
    <Container>
      <section className="post">
        <div className="post__container">
          <h1 className="post__title">{props.reflectionText.title}</h1>
          <div className="post__content">
            <PortableText value={props.reflectionText.body} />
          </div>
        </div>
      </section>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(therapySlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/textos-reflexao/${slug}`) || [],
    fallback: 'blocking',
  }
}
