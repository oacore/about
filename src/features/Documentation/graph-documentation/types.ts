import type { DocumentationGuidePageData } from '@features/Documentation/guide'

export type GraphDocumentationPageData = DocumentationGuidePageData

export type GraphDocumentationPageProps = Pick<GraphDocumentationPageData, 'docs' | 'navigation'>
