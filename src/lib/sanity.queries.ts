import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const menuPagesQuery = groq`*[_type == 'page'] {
  _type: 'menuItem',
  page: {
    _ref: _id,
    _type: 'reference'
  }
}`
export const pagesQuery = groq`*[_type == "page" && defined(slug.current)] {
  _id, title, slug, submenus, submenusOrigin
} | order(title asc)`
export const submenusQuery = (collectionName) => groq`*[_type == "${collectionName}" && defined(slug.current)] {
  title, slug
} | order(title asc)`

export async function getPages(client: SanityClient): Promise<Page[]> {
  return await client.fetch(pagesQuery)
}
export async function getMenuPages(client: SanityClient): Promise<Page[]> {
  return await client.fetch(menuPagesQuery)
}
export async function getSubmenuItems(client: SanityClient, collectionName: string): Promise<Therapy[]> {
  const query = submenusQuery(collectionName);
  return await client.fetch(query);
}

export const getGlobalBySlugQuery = groq`*[_type == "global" && title == $title][0]`
export const getBySlugQuery = (contentName) => groq`*[_type == "${contentName}" && slug.current == $slug][0]`
export const therapyBySlugQuery = groq`*[_type == "therapy" && slug.current == $slug][0]`

export async function getGlobalByTitle(
  client: SanityClient,
  title: string,
): Promise<Page> {
  return await client.fetch(getGlobalBySlugQuery, {
    title,
  })
}
export async function getContentBySlug(
  client: SanityClient,
  contentName: string,
  slug: string,
): Promise<Page> {
  const query = getBySlugQuery(contentName);
  console.log('GetBySlug ::: ', query);
  return await client.fetch(query, {
    slug,
  })
}
export async function getTherapy(
  client: SanityClient,
  slug: string,
): Promise<Therapy> {
  return await client.fetch(therapyBySlugQuery, {
    slug,
  })
}

export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`
export const therapySlugsQuery = groq`
*[_type == "therapy" && defined(slug.current)][].slug.current
`

export interface Page {
  _type: 'page'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  submenus: Boolean
  submenusOrigin?: string
  body?: PortableTextBlock[]
}
export interface Therapy {
  _type: 'therapy'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  body: PortableTextBlock[]
}

export interface ReflectionText {
  _type: 'reflection-text'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  body: PortableTextBlock[]
}
