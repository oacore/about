import { cache } from 'react'

import { getMarkdownPage, getSections } from 'content'

import type {
  OaiResolverBlock,
  OaiResolverFaqItem,
  OaiResolverHeader,
  OaiResolverSection,
} from '@features/Documentation/oai-resolver/types'

const FAQ_SLUGS = new Set(['what-is-oai-base-url', 'oai-about', 'oai-not-resolve'])

type YamlPage = {
  title?: string
  description?: string
  header?: OaiResolverHeader | OaiResolverHeader[]
  Header?: OaiResolverHeader | OaiResolverHeader[]
  sections?: OaiResolverSection[]
}

type FaqSection = {
  id?: string
  items?: OaiResolverFaqItem[]
  sections?: FaqSection[]
}

const resolveHeader = (page: YamlPage): OaiResolverHeader | undefined => {
  const header = page.header ?? page.Header
  if (!header) {
    return undefined
  }

  return Array.isArray(header) ? header[0] : header
}

const pairSections = (sections: OaiResolverSection[] = []): OaiResolverBlock[] => {
  const blocks: OaiResolverBlock[] = []

  for (let index = 0; index < sections.length; index += 2) {
    blocks.push({
      left: sections[index],
      right: sections[index + 1],
    })
  }

  return blocks
}

const collectFaqItems = (sections: FaqSection[] = []): OaiResolverFaqItem[] =>
  sections.flatMap((section) => [
    ...(section.id === 'technical-aggregation' ? section.items ?? [] : []),
    ...collectFaqItems(section.sections),
  ])

export const loadOaiResolverDocumentationPage = cache(async () => {
  const [page, faqsBundle] = await Promise.all([
    getMarkdownPage('Documentation/oai-resolver.yml'),
    getSections('faqs'),
  ])

  const yamlPage = page as YamlPage
  const faqs = (faqsBundle.faqs ?? faqsBundle) as { sections?: FaqSection[] }
  const header = resolveHeader(yamlPage)

  return {
    title: header?.title ?? yamlPage.title,
    description: yamlPage.description ?? header?.content,
    header,
    blocks: pairSections(yamlPage.sections),
    faqItems: collectFaqItems(faqs.sections).filter((item) => FAQ_SLUGS.has(item.slug)),
  }
})
