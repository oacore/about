import type { Metadata } from 'next'

import { FairRepositoryCertificationPage } from '@features/Documentation/fair-repository-certification'

import { loadFairRepositoryCertificationPage } from './loadFairRepositoryCertificationPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await loadFairRepositoryCertificationPage()

  return {
    title: meta?.title,
    description: meta?.tagline,
  }
}

const FairRepositoryCertificationRoutePage = async () => {
  const { docs, navigation } = await loadFairRepositoryCertificationPage()

  return <FairRepositoryCertificationPage docs={docs} navigation={navigation} />
}

export default FairRepositoryCertificationRoutePage
