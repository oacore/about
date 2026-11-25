import type { Metadata } from 'next'

import { FaqPage } from '@features/faq'

import { loadFaqPage } from './loadFaqPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadFaqPage()

  return {
    title: page.title,
    description: page.description,
  }
}

const FaqRoutePage = async () => {
  const page = await loadFaqPage()

  return <FaqPage data={page} />
}

export default FaqRoutePage
