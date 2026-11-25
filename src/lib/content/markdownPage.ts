import { cache } from 'react'

import { getMarkdownPage, getSections } from 'content'

import type { ServiceMainWrapperService } from '@components/ServiceMainWrapper'

export type MarkdownPageData = {
  id?: string
  title?: string
  headline?: string
  description?: string
  /** Intro line shown under the title. */
  lead?: string
  keywords?: string | string[]
  body?: string
  services?: ServiceMainWrapperService[]
}

export const STATIC_PAGE_SLUGS = [
  'acknowledge',
  'accessibility',
  'privacy',
  'how-core-supports-open-access',
  'environmental-impact-statement',
] as const

export type StaticPageSlug = (typeof STATIC_PAGE_SLUGS)[number]

/** Static pages whose content lives in a `{ header, main }` sections file instead of `pages/<slug>.md`. */
const SECTION_PAGE_SOURCES: Partial<Record<StaticPageSlug, string>> = {
  'environmental-impact-statement': 'environmental-impact',
}

type SectionsPageContent = {
  header?: { title?: string; description?: string }
  main?: Array<{ content?: string }>
}

export const DOCUMENTATION_PAGE_SLUGS = [
  'api',
  'connector',
  'discovery',
  'fastsync',
  'recommender',
  'repository-dashboard',
  'discovery-plugin',
] as const

export type DocumentationPageSlug = (typeof DOCUMENTATION_PAGE_SLUGS)[number]

const OPEN_ACCESS_PAGE_SLUG = 'how-core-supports-open-access'

export const isStaticPageSlug = (slug: string): slug is StaticPageSlug =>
  STATIC_PAGE_SLUGS.includes(slug as StaticPageSlug)

export const isDocumentationPageSlug = (slug: string): slug is DocumentationPageSlug =>
  DOCUMENTATION_PAGE_SLUGS.includes(slug as DocumentationPageSlug)

const loadMarkdownPage = cache(async (base: string, slug: string): Promise<MarkdownPageData> => {
  const page = (await getMarkdownPage(`${base}/${slug}.md`)) as MarkdownPageData

  if (slug !== OPEN_ACCESS_PAGE_SLUG) {
    return page
  }

  const { services } = (await getSections('commonServices')) as {
    services?: ServiceMainWrapperService[]
  }

  return { ...page, services }
})

const loadSectionsAsMarkdownPage = cache(async (source: string): Promise<MarkdownPageData> => {
  const { header, main } = (await getSections(source)) as SectionsPageContent

  return {
    title: header?.title,
    description: header?.description,
    lead: header?.description,
    body: main?.map((item) => item.content ?? '').join('\n\n'),
  }
})

export const loadStaticMarkdownPage = (slug: StaticPageSlug): Promise<MarkdownPageData> => {
  const source = SECTION_PAGE_SOURCES[slug]
  return source ? loadSectionsAsMarkdownPage(source) : loadMarkdownPage('pages', slug)
}

export const loadDocumentationMarkdownPage = (slug: DocumentationPageSlug) =>
  loadMarkdownPage('docs', slug)
