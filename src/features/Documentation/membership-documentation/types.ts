import type { DocumentationGuidePageData } from '@features/Documentation/guide'

export type MembershipDocumentationPageData = DocumentationGuidePageData

export type MembershipDocumentationPageProps = Pick<
  MembershipDocumentationPageData,
  'docs' | 'navigation'
>
