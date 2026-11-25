import type { Metadata } from 'next'

import { DatasetDocumentationPage } from '@features/Documentation/dataset'

import { loadDatasetDocumentationPage } from './loadDatasetDocumentationPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { meta, header } = await loadDatasetDocumentationPage()

  return {
    title: meta?.title ?? header?.title,
    description: meta?.tagline ?? header?.caption,
  }
}

const DatasetDocumentationRoutePage = async () => {
  const data = await loadDatasetDocumentationPage()

  return <DatasetDocumentationPage {...data} />
}

export default DatasetDocumentationRoutePage
