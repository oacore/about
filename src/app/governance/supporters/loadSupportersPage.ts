import { cache } from 'react'

import { getSections } from 'content'

import {
  fetchMembers,
  filterCarouselMembers,
} from '@/lib/members/fetchMembers'

import type { CoreMember } from '@features/membership/types'
import type { SupportersPageData } from '@features/governance/types'

// USRN partners stay in the list; the table labels them (EXCLUDED_REPO_IDS)
const filterSupportersMembers = (members: CoreMember[]): CoreMember[] =>
  filterCarouselMembers(members)

export const loadSupportersPage = cache(async () => {
  const [page, members] = await Promise.all([
    getSections('board-supporters'),
    fetchMembers(),
  ])

  return {
    page: page as SupportersPageData,
    members: filterSupportersMembers(members),
  }
})
