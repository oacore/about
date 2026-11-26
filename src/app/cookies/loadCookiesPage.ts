import { cache } from 'react'

import { getSections } from 'content'

import type { CookiesPageData } from '@features/cookies/types'

export const loadCookiesPage = cache(async () => {
  const page = (await getSections('cookies')) as CookiesPageData

  return {
    page,
  }
})
