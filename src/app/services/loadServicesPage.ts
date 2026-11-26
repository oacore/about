import { getSections } from 'content'

import type { ServicesPageData } from './types'

export const loadServicesPage = async (): Promise<ServicesPageData> => {
  return (await getSections('services')) as ServicesPageData
}
