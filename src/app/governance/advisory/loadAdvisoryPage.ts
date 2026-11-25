import { getSections } from 'content'

import type { AdvisoryPageData } from '@features/governance/types'

export const loadAdvisoryPage = async (): Promise<AdvisoryPageData> => {
  return (await getSections('advisory')) as AdvisoryPageData
}
