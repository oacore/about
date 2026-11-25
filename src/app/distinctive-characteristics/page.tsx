import type { Metadata } from 'next'

import { DistinctiveCharacteristicsPage } from '@features/distinctive-characteristics'

import { loadDistinctiveCharacteristicsPage } from './loadDistinctiveCharacteristicsPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadDistinctiveCharacteristicsPage()

  return {
    title: page.title,
    description: page.description,
  }
}

const DistinctiveCharacteristicsRoutePage = async () => {
  const page = await loadDistinctiveCharacteristicsPage()

  return <DistinctiveCharacteristicsPage data={page} />
}

export default DistinctiveCharacteristicsRoutePage
