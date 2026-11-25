import type { Metadata } from 'next'

import { DataAvailabilityPage } from '@features/data-availability'

import { loadDataAvailabilityPage } from './loadDataAvailabilityPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadDataAvailabilityPage()

  return {
    title: page.header?.header?.title,
    description: page.header?.header?.description,
  }
}

const DataAvailabilityRoutePage = async () => {
  const page = await loadDataAvailabilityPage()

  return <DataAvailabilityPage data={page} />
}

export default DataAvailabilityRoutePage
