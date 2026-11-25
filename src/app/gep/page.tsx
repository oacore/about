import type { Metadata } from 'next'

import { LegalPage } from '@features/legal'

import { loadGepPage } from './loadGepPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadGepPage()

  return {
    title: page.header?.title,
    description: page.header?.description,
  }
}

const GepRoutePage = async () => {
  const { page } = await loadGepPage()

  return <LegalPage data={page} id="gepPage" navAriaLabel="Gender Equality Plan sections" />
}

export default GepRoutePage
