import { cache } from 'react'

import { getSections } from 'content'

import { getDocumentationGuideData } from '@features/Documentation/guide'
import type { GraphDocumentationPageData } from '@features/Documentation/graph-documentation'

export const loadGraphDocumentationPage = cache(async (): Promise<GraphDocumentationPageData> => {
  const content = await getSections('docs-graph')

  return getDocumentationGuideData(content, 'docs', ['headerAbout', 'headerDashboard'])
})
