import { cache } from 'react'

import { getSections } from 'content'

import type { ServiceMainWrapperService } from '@components/ServiceMainWrapper'
import type { RefPageData } from '@features/ref/types'

export const loadRefPage = cache(async () => {
  const [page, benefits] = await Promise.all([getSections('ref'), getSections('benefits')])

  const { services } = benefits as { services?: ServiceMainWrapperService[] }

  return {
    page: {
      ...(page as RefPageData),
      services,
    },
  }
})
