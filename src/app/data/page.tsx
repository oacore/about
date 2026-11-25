import type { Metadata } from 'next'

import { DataPage } from '@features/data'

import { loadDataPage } from './loadDataPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadDataPage()

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  }
}

const DataRoutePage = async () => {
  const page = await loadDataPage()

  return <DataPage data={page} />
}

export default DataRoutePage
