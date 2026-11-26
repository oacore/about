import { cache } from 'react'

import { getSections } from 'content'

import type { LegalPageData } from '@features/legal/types'

export const loadTermsPage = cache(async () => {
  const page = await getSections('terms-conditions')

  return {
    page: page as LegalPageData,
  }
})
