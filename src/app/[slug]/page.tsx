import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MarkdownPage from '@components/MarkdownPage'
import {
  isStaticPageSlug,
  loadStaticMarkdownPage,
  STATIC_PAGE_SLUGS,
} from '@/lib/content/markdownPage'

type StaticMarkdownPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () => STATIC_PAGE_SLUGS.map((slug) => ({ slug }))

const resolveKeywords = (keywords: string | string[] | undefined): string[] | undefined => {
  if (!keywords) return undefined
  return Array.isArray(keywords) ? keywords : [keywords]
}

export const generateMetadata = async ({ params }: StaticMarkdownPageProps): Promise<Metadata> => {
  const { slug } = await params

  if (!isStaticPageSlug(slug)) {
    return {}
  }

  const data = await loadStaticMarkdownPage(slug)

  return {
    title: data.title,
    description: data.description,
    keywords: resolveKeywords(data.keywords),
  }
}

const StaticMarkdownRoutePage = async ({ params }: StaticMarkdownPageProps) => {
  const { slug } = await params

  if (!isStaticPageSlug(slug)) {
    notFound()
  }

  const data = await loadStaticMarkdownPage(slug)

  return <MarkdownPage data={data} />
}

export default StaticMarkdownRoutePage
