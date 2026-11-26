import { cache } from 'react'

import dayjs from 'dayjs'

import { ASSETS_BASE_URL, getSections } from 'content'

import { fetchCoreStatistics } from '@/lib/statistics/fetchCoreStatistics'

import type { HistoryMilestone, HistoryPageData } from '@features/history/types'

type RawMilestone = {
  id?: string
  title?: string
  body?: string
  date?: string | Date
  image?: { src?: string; alt?: string }
  link?: HistoryMilestone['link']
}

const toAssetUrl = (src: string): string =>
  src.startsWith('http') ? src : new URL(src.replace(/^\/?/, './'), ASSETS_BASE_URL).href

export const loadHistoryPage = cache(async (): Promise<HistoryPageData> => {
  const [bundle, statistics] = await Promise.all([
    getSections('history'),
    fetchCoreStatistics().catch(() => ({})),
  ])

  const milestones = Object.values(bundle).flatMap((value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return []
    }

    const item = value as RawMilestone
    if (!item.id) {
      return []
    }

    const date = dayjs(item.date)

    return [
      {
        id: item.id,
        title: item.title,
        body: item.body,
        link: item.link,
        image: item.image?.src
          ? { src: toAssetUrl(item.image.src), alt: item.image.alt }
          : undefined,
        date: {
          numeric: date.format('MM-YYYY'),
          long: date.format('MMMM YYYY'),
        },
      } satisfies HistoryMilestone,
    ]
  })

  return {
    statistics,
    milestones: milestones.sort((left, right) => right.id.localeCompare(left.id)),
  }
})
