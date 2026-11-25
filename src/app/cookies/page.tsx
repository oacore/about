import type { Metadata } from 'next'

import { CookiesPage } from '@features/cookies'

import { loadCookiesPage } from './loadCookiesPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadCookiesPage()

  return {
    title: page.title,
    description: page.description,
  }
}

const CookiesRoutePage = async () => {
  const { page } = await loadCookiesPage()

  return <CookiesPage data={page} />
}

export default CookiesRoutePage
