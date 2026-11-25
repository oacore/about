import type { Metadata } from 'next'

import { RightsRetentionPage } from '@features/rights-retention'

import { loadRightsRetentionPage } from './loadRightsRetentionPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadRightsRetentionPage()

  return {
    title: page.header?.header?.title,
    description: page.header?.header?.description,
  }
}

const RightsRetentionRoutePage = async () => {
  const page = await loadRightsRetentionPage()

  return <RightsRetentionPage data={page} />
}

export default RightsRetentionRoutePage
