import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Container from '~/components/layout/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  pageSlugsQuery,
  getContentBySlug,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
import PortableImage from '~/components/PortableImage'
import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'

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
  
  const page = await getContentBySlug(client, 'page', params.slug);
  if (!page || !params.slug) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      page
    },
  }
}

export default function SlugRoute(
  {page, ...props}: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();

  useEffect(() => {
    document.title = `${page.title} | Nepunah`;
    document.documentElement.setAttribute('lang', 'pt-BR');

    router.query.slug === 'home' && router.replace('/');
  }, []);
  return (
    <Container {...props}>
      <PortableText value={page.body} components={{ types: { image: PortableImage } }} />
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(pageSlugsQuery)

  console.log('Slugs ::: ', slugs);

  return {
    paths: slugs?.map((slug) => ({ params: { slug } })) || [],
    fallback: 'blocking',
  }
}
