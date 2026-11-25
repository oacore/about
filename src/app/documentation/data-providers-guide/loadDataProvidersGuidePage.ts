import { cache } from 'react'

import { getSections } from 'content'

import type { DataProvidersGuidePageData } from '@features/Documentation/data-providers-guide'
import { getDocumentationGuideData } from '@features/Documentation/guide'

export const loadDataProvidersGuidePage = cache(async (): Promise<DataProvidersGuidePageData> => {
  const content = await getSections('docs-dataProvider')

  return getDocumentationGuideData(content, 'dataProviderDocs')
})
