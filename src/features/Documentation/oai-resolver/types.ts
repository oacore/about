export type OaiResolverHeader = {
  title?: string
  content?: string
}

export type OaiResolverSection = {
  title?: string | null
  content?: string
}

export type OaiResolverBlock = {
  left: OaiResolverSection
  right?: OaiResolverSection
}

export type OaiResolverFaqItem = {
  slug: string
  question: string
  answer: string
}

export type OaiResolverDocumentationProps = {
  header?: OaiResolverHeader
  blocks: OaiResolverBlock[]
  faqItems: OaiResolverFaqItem[]
}
