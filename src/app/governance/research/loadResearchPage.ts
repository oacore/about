import { getSections } from 'content'

import type { ResearchPageData } from '@features/governance/types'

export const loadResearchPage = async (): Promise<ResearchPageData> => {
  return (await getSections('community')) as ResearchPageData
}
