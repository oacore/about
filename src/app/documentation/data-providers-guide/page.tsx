import type { Metadata } from 'next'

import { DataProvidersGuidePage } from '@features/Documentation/data-providers-guide'

import { loadDataProvidersGuidePage } from './loadDataProvidersGuidePage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await loadDataProvidersGuidePage()

  return {
    title: meta?.title,
    description: meta?.description ?? meta?.tagline,
  }
}

const DataProvidersGuideRoutePage = async () => {
  const { docs, navigation } = await loadDataProvidersGuidePage()

  return <DataProvidersGuidePage docs={docs} navigation={navigation} />
}

export default DataProvidersGuideRoutePage
