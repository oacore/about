import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MarkdownPage from '@components/MarkdownPage'
import {
  DOCUMENTATION_PAGE_SLUGS,
  isDocumentationPageSlug,
  loadDocumentationMarkdownPage,
} from '@/lib/content/markdownPage'

type DocumentationPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () => DOCUMENTATION_PAGE_SLUGS.map((slug) => ({ slug }))

const resolveKeywords = (keywords: string | string[] | undefined): string[] | undefined => {
  if (!keywords) return undefined
  return Array.isArray(keywords) ? keywords : [keywords]
}

export const generateMetadata = async ({ params }: DocumentationPageProps): Promise<Metadata> => {
  const { slug } = await params

  if (!isDocumentationPageSlug(slug)) {
    return {}
  }

  const data = await loadDocumentationMarkdownPage(slug)

  return {
    title: data.title,
    description: data.description,
    keywords: resolveKeywords(data.keywords),
  }
}

const DocumentationRoutePage = async ({ params }: DocumentationPageProps) => {
  const { slug } = await params

  if (!isDocumentationPageSlug(slug)) {
    notFound()
  }

  const data = await loadDocumentationMarkdownPage(slug)

  return <MarkdownPage data={data} />
}

export default DocumentationRoutePage
