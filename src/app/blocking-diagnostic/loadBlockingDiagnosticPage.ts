import { cache } from 'react'

import { getSections } from 'content'

import type { BlockingDiagnosticPageData } from '@features/blocking-diagnostic/types'

export const loadBlockingDiagnosticPage = cache(async (): Promise<BlockingDiagnosticPageData> => {
  return (await getSections('diagnostic')) as BlockingDiagnosticPageData
})
