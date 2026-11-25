import { cache } from 'react'

import { getSections } from 'content'

import { fetchCoreStatistics } from '@/lib/statistics/fetchCoreStatistics'

import type { DataPageData } from '@features/data/types'

export const loadDataPage = cache(async (): Promise<DataPageData> => {
  const [page, statistics] = await Promise.all([
    getSections('data/data.yml'),
    fetchCoreStatistics(),
  ])

  return {
    ...(page as DataPageData),
    statistics,
  }
})
