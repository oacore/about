export type DocsTutorial = {
  src: string
  title?: string
  text: string
  img?: string
}

export type DocsImage = {
  file: string
  /** Caption shown beside the image (badge/logo examples). */
  source?: string
}

export type DocsRedirect = {
  link: string
  text: string
  image?: string
}

export type DocsMembershipTypes = Record<string, 'Yes' | 'No'>

export type DocsItem = {
  id: string
  title: string
  descriptionAbout: string
  membershipTypes?: DocsMembershipTypes
  /** Kebab-case variant some content files still use. */
  'membership-types'?: DocsMembershipTypes
  tutorial?: DocsTutorial
  redirect?: DocsRedirect
  images?: DocsImage[]
  subTitle?: string
  subDescription?: string
  border?: boolean
  divider?: boolean
}

export type DocsNavItem = {
  /** Markdown-ish label; a fully bold label (`**…**`) marks a top-level chapter. */
  title: string
  href: string
  hidden?: boolean
  children?: DocsNavItem[]
}

export type DocumentationGuideMeta = {
  title?: string
  tagline?: string
  description?: string
}

export type DocumentationGuideDocs = {
  items: DocsItem[]
  tutorial?: DocsTutorial
}

export type DocumentationGuidePageData = {
  docs: DocumentationGuideDocs
  navigation: DocsNavItem[]
  meta?: DocumentationGuideMeta
}

export type DocumentationGuidePageProps = {
  docs: DocsItem[]
  tutorial?: DocsTutorial
  navigation: DocsNavItem[]
  docsTitle: string
  /** Data provider's guide: example images span the full width instead of image + caption. */
  imageSource?: boolean
}
