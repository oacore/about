import { cache } from 'react'

import { getSections } from 'content'

import type { ResearchOutputsPageData } from '@features/research-outputs/types'

export const loadResearchOutputsPage = cache(async () => {
  const page = await getSections('research-outputs')

  return {
    page: page as ResearchOutputsPageData,
  }
})
