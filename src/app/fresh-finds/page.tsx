import type { Metadata } from 'next'

import { FreshFindsPage } from '@features/fresh-finds'

import { loadFreshFindsPage } from './loadFreshFindsPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadFreshFindsPage()

  return {
    title: page.meta?.title,
    description: page.meta?.tagline?.replace(/\s+/g, ' ').trim(),
  }
}

const FreshFindsRoutePage = async () => {
  const page = await loadFreshFindsPage()

  return <FreshFindsPage data={page} />
}

export default FreshFindsRoutePage
