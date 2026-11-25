import { cache } from 'react'

import { getSections } from 'content'

import type { LegalPageData } from '@features/legal/types'

export const loadModernSlaveryPage = cache(async () => {
  const page = await getSections('modern-slavery')

  return {
    page: page as LegalPageData,
  }
})
