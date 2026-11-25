import { cache } from 'react'

import { getSections } from 'content'

import { fetchCoreStatistics } from '@/lib/statistics/fetchCoreStatistics'

import type { BenefitsContent, BenefitsPageData } from '@features/benefits/types'
import type { FaqItem, FaqPageData } from '@features/faq/types'

type FaqsBundle = FaqPageData & {
  faqs?: FaqPageData
}

export const loadBenefitsPage = cache(async (): Promise<BenefitsPageData> => {
  const [benefits, faqsBundle, statistics] = await Promise.all([
    getSections('benefits'),
    getSections('faqs'),
    fetchCoreStatistics().catch(() => ({})),
  ])

  const faqs = (faqsBundle as FaqsBundle).faqs ?? (faqsBundle as FaqPageData)
  const joiningSection =
    faqs.sections?.find((section) => section.id === 'joining-core') ?? faqs.sections?.[0]

  return {
    ...(benefits as BenefitsContent),
    statistics,
    faqItems: (joiningSection?.items ?? []) as FaqItem[],
  }
})
