import { cache } from 'react'

import { getSections } from 'content'

import {
  fetchMembers,
  filterCarouselMembers,
  filterListedMembers,
} from '@/lib/members/fetchMembers'

import type {
  MembershipAnnualFeesPageData,
  MembershipPageData,
  MembershipPlanSlug,
  MembershipPricesPageData,
} from '@features/membership/types'
import { MEMBERSHIP_PLAN_SLUGS } from '@features/membership/types'

export const loadMembershipPage = cache(async () => {
  const [page, members] = await Promise.all([
    getSections('membership'),
    fetchMembers(),
  ])

  return {
    page: page as MembershipPageData,
    members: filterCarouselMembers(members),
    allMembers: filterListedMembers(members),
  }
})

export const isMembershipPlanSlug = (slug: string): slug is MembershipPlanSlug =>
  MEMBERSHIP_PLAN_SLUGS.includes(slug as MembershipPlanSlug)

export const loadMembershipPricesPage = cache(
  async (slug: MembershipPlanSlug): Promise<MembershipPricesPageData> => {
    const page = (await getSections('membership')) as MembershipPageData
    const fee = page.fee?.fee

    if (!fee) {
      throw new Error('Missing membership fee content')
    }

    const planTable = fee.table[slug]

    if (!planTable?.rows) {
      throw new Error(`Missing fee table for membership plan "${slug}"`)
    }

    return {
      header: {
        title: page.header?.header.title ?? 'CORE Membership',
        description: fee.description[slug],
        subDescription: fee.subDescription?.[slug],
        note: fee.note[slug],
      },
      fee,
      planName: slug,
      comparisonTable: page.plan!.table.comparisonTable,
      box: page.box?.box,
      googleForm: fee.action.googleForm,
    }
  },
)

export const loadMembershipAnnualFeesPage = cache(
  async (slug: MembershipPlanSlug): Promise<MembershipAnnualFeesPageData> => {
    const page = (await getSections('membership')) as MembershipPageData
    const fee = page.fee?.fee
    const tableData = fee?.table[slug]
    const subRows = tableData?.subRows ?? []

    return {
      header: {
        title: `Annual membership fees for ${slug} members`,
        planName: slug,
      },
      fee: {
        title: fee?.title ?? '',
        warning: fee?.warning,
        subNote: fee?.subNote,
        table: {
          headers: fee?.table.headers ?? [],
          rows: subRows,
        },
      },
      planName: slug,
    }
  },
)

export const getMembershipPlanSlugs = (): MembershipPlanSlug[] => [...MEMBERSHIP_PLAN_SLUGS]
