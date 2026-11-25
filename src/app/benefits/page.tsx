import type { Metadata } from 'next'

import { BenefitsPage } from '@features/benefits'

import { loadBenefitsPage } from './loadBenefitsPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadBenefitsPage()

  return {
    title: page.title,
    description: page.description?.replace(/\s+/g, ' ').trim(),
  }
}

const BenefitsRoutePage = async () => {
  const page = await loadBenefitsPage()

  return <BenefitsPage data={page} />
}

export default BenefitsRoutePage
