import { getSections } from 'content'

import type { SdgPageData } from '@features/sdg/types'

export const loadSdgPage = async (): Promise<SdgPageData> => {
  return (await getSections('sdg')) as SdgPageData
}
