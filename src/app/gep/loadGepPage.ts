import { cache } from 'react'

import { getSections } from 'content'

import type { LegalPageData } from '@features/legal/types'

export const loadGepPage = cache(async () => {
  const page = await getSections('gep')

  return {
    page: page as LegalPageData,
  }
})
