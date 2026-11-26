import type { Metadata } from 'next'

import { GovernancePage } from '@features/governance'

import { loadGovernancePage } from './loadGovernancePage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadGovernancePage()

  return {
    title: page.header?.header?.title,
    description: page.header?.header?.description,
  }
}

const GovernanceRoutePage = async () => {
  const page = await loadGovernancePage()

  return <GovernancePage data={page} />
}

export default GovernanceRoutePage
