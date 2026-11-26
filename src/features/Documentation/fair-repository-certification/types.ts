import type { DocumentationGuidePageData } from '@features/Documentation/guide'

export type FairRepositoryCertificationPageData = DocumentationGuidePageData

export type FairRepositoryCertificationPageProps = Pick<FairRepositoryCertificationPageData, 'docs' | 'navigation'>
