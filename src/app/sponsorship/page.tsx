import type { Metadata } from 'next'

import { SponsorshipPage } from '@features/sponsorships'

import { loadSponsorshipPage } from './loadSponsorshipPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadSponsorshipPage()

  return {
    title: page.meta?.title ?? page.header?.header.title,
    description: page.meta?.tagline ?? page.header?.header.description,
  }
}

const SponsorshipRoutePage = async () => {
  const { page, discountNote } = await loadSponsorshipPage()

  return <SponsorshipPage data={page} discountNote={discountNote} />
}

export default SponsorshipRoutePage
