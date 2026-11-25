import { getSections } from 'content'

import type { LabsPageData } from '@features/labs/types'

export const loadLabsPage = async (): Promise<LabsPageData> => {
  return (await getSections('coreLabs')) as LabsPageData
}
