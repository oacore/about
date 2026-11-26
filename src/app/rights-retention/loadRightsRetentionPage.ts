import { getSections } from 'content'

import type { RightsRetentionPageData } from '@features/rights-retention/types'

export const loadRightsRetentionPage = async (): Promise<RightsRetentionPageData> => {
  return (await getSections('rrs')) as RightsRetentionPageData
}
