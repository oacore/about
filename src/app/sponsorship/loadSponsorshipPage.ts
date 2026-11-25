import { cache } from 'react'

import { getSections } from 'content'

import type { MembershipPageData } from '@features/membership/types'
import type { SponsorshipPageData } from '@features/sponsorships/types'

export const loadSponsorshipPage = cache(async () => {
  const [page, membership] = await Promise.all([
    getSections('sponsorship'),
    getSections('membership'),
  ])

  const membershipPage = membership as MembershipPageData

  return {
    page: page as SponsorshipPageData,
    discountNote: membershipPage.fee?.fee.noteSecond,
  }
})
