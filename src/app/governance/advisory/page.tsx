import type { Metadata } from 'next'

import { AdvisoryPage } from '@features/governance'

import { loadAdvisoryPage } from './loadAdvisoryPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadAdvisoryPage()

  return {
    title: page.meta?.title ?? page.header?.header?.title,
    description: page.meta?.tagline ?? page.header?.header?.description,
  }
}

const AdvisoryRoutePage = async () => {
  const page = await loadAdvisoryPage()

  return <AdvisoryPage data={page} />
}

export default AdvisoryRoutePage
