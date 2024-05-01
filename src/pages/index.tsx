import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PortableText } from '@portabletext/react'

import Container from '~/components/layout/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getContentBySlug } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import PortableImage from '~/components/PortableImage'
import { useEffect } from 'react'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    page: any
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const page = await getContentBySlug(client, 'page', 'home');

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      page
    },
  }
}

export default function IndexPage(
  {page, ...props}: InferGetStaticPropsType<typeof getStaticProps>,
) {
  useEffect(() => {
    document.title = `${page.title} | Nepunah`;
    document.documentElement.setAttribute('lang', 'pt-BR');
  }, []);
  return (
    <Container {...props}>
      <section>
        {/* {props.page} */}
        <PortableText value={page.body} components={{ types: { image: PortableImage } }} />
      </section>
    </Container>
  )
}
