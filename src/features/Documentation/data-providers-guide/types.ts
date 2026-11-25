import type { DocumentationGuidePageData } from '@features/Documentation/guide'

export type DataProvidersGuidePageData = DocumentationGuidePageData

export type DataProvidersGuidePageProps = Pick<DataProvidersGuidePageData, 'docs' | 'navigation'>
