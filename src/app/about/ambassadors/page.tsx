import type { Metadata } from 'next'

import { AmbassadorsPage } from '@features/ambassadors'

import { loadAmbassadorsPage } from './loadAmbassadorsPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadAmbassadorsPage()

  return {
    title: page.title ?? 'Ambassadors',
    description: page.description,
    keywords: page.keywords,
  }
}

const AmbassadorsRoutePage = async () => {
  const page = await loadAmbassadorsPage()

  return <AmbassadorsPage data={page} />
}

export default AmbassadorsRoutePage
