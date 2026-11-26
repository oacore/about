import { getSections } from 'content'

import type { DataAvailabilityPageData } from '@features/data-availability/types'

export const loadDataAvailabilityPage = async (): Promise<DataAvailabilityPageData> => {
  return (await getSections('das')) as DataAvailabilityPageData
}
