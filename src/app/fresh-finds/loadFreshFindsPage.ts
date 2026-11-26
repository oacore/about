import { cache } from 'react'

import { getSections } from 'content'

import { fetchCoreStatistics } from '@/lib/statistics/fetchCoreStatistics'
import { patchStats } from '@utils/patchStats'

import type { FreshFindsContent, FreshFindsPageData } from '@features/fresh-finds/types'

export const loadFreshFindsPage = cache(async (): Promise<FreshFindsPageData> => {
  const [content, statistics] = await Promise.all([
    // the content `fresh-finds/` folder holds a single fresh-finds.yml, so getSections spreads it
    getSections('fresh-finds'),
    // old page read data/core.yml statistics for the workflow {{...}} placeholders
    fetchCoreStatistics().catch(() => ({})),
  ])

  const page = content as FreshFindsContent

  return {
    ...page,
    // patched on the server (old page did it in render) so raw {{...}} never reaches the client payload
    workflow: {
      ...page.workflow,
      steps: page.workflow.steps.map((step) => ({
        ...step,
        description: patchStats(step.description, statistics),
      })),
    },
    statistics,
  }
})
