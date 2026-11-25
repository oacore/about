import { cache } from 'react'

import { getSections } from 'content'

import type { DistinctiveCharacteristicsPageData } from '@features/distinctive-characteristics/types'

export const loadDistinctiveCharacteristicsPage = cache(
  async (): Promise<DistinctiveCharacteristicsPageData> => {
    return (await getSections('distinctive-characteristics')) as DistinctiveCharacteristicsPageData
  },
)
