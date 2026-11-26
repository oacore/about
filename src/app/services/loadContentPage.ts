import { cache } from 'react'

import { getSections } from 'content'

import type { ServicePageProps } from '@components/pages/types'
import { fetchCoreStatistics } from '@/lib/statistics/fetchCoreStatistics'

const CONTENT_PAGES = [
  'api',
  'consultancy',
  'dataset',
  'fastsync',
  'discovery',
  'fair-certification',
  'recommender',
  'repository-dashboard',
] as const

export type ContentPageSlug = (typeof CONTENT_PAGES)[number]

/** Route slugs that differ from folder names in oacore/content. */
const CONTENT_PATH_BY_SLUG: Partial<Record<ContentPageSlug, string>> = {
  dataset: 'datasets',
  recommender: 'recomender',
  'repository-dashboard': 'dashboard',
}

export const isContentPageSlug = (slug: string): slug is ContentPageSlug =>
  CONTENT_PAGES.includes(slug as ContentPageSlug)

const resolveContentPath = (slug: ContentPageSlug): string => CONTENT_PATH_BY_SLUG[slug] ?? slug

// old pages/services/{api,dataset,discovery}.jsx passed live statistics for their {{...}} counts
const STATISTICS_SLUGS = new Set<ContentPageSlug>(['api', 'dataset', 'discovery'])

export const loadContentPage = cache(async (slug: ContentPageSlug): Promise<ServicePageProps> => {
  const contentPath = resolveContentPath(slug)

  if (STATISTICS_SLUGS.has(slug)) {
    const [page, liveStatistics] = await Promise.all([
      getSections(contentPath),
      fetchCoreStatistics(),
    ])

    return {
      ...(page as ServicePageProps),
      statistics: {
        statistics: liveStatistics,
      },
    }
  }

  const page = await getSections(contentPath)
  return page as ServicePageProps
})

export const getContentPageSlugs = (): ContentPageSlug[] => [...CONTENT_PAGES]
