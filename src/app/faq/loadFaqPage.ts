import { cache } from 'react'

import { getSections } from 'content'

import type { FaqPageData } from '@features/faq/types'

type FaqsBundle = FaqPageData & {
  faqs?: FaqPageData
  meta?: {
    title?: string
    tagline?: string
  }
}

export const loadFaqPage = cache(async (): Promise<FaqPageData> => {
  const bundle = (await getSections('faqs')) as FaqsBundle
  const page = bundle.faqs ?? bundle

  return {
    title: page.title ?? bundle.meta?.title,
    description: page.description ?? bundle.meta?.tagline,
    sections: page.sections ?? [],
  }
})
