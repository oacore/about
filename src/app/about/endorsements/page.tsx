import type { Metadata } from 'next'

import { EndorsementsPage } from '@features/endorsements'

import { loadEndorsementsPage } from './loadEndorsementsPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadEndorsementsPage()

  return {
    title: page.title ?? 'Endorsements',
    description: page.description,
    keywords: page.keywords,
  }
}

const EndorsementsRoutePage = async () => {
  const page = await loadEndorsementsPage()

  return <EndorsementsPage data={page} />
}

export default EndorsementsRoutePage
