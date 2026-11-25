import { getSections } from 'content'

import type { GovernancePageData } from '@features/governance/types'

export const loadGovernancePage = async (): Promise<GovernancePageData> => {
  return (await getSections('governance')) as GovernancePageData
}
