import { cache } from 'react'

import { getSections } from 'content'

import { getDocumentationGuideData } from '@features/Documentation/guide'
import type { FairRepositoryCertificationPageData } from '@features/Documentation/fair-repository-certification'

export const loadFairRepositoryCertificationPage = cache(async (): Promise<FairRepositoryCertificationPageData> => {
  const content = await getSections('docs-fair')

  return getDocumentationGuideData(content, 'docs', ['header'])
})
