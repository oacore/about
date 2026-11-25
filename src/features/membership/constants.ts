import type { CoreMember } from './types'

/**
 * Repository IDs of USRN partners: labelled "USRN Partner" and sorted after
 * supporting members.
 */
export const EXCLUDED_REPO_IDS: number[] = [
  3463, 183, 2145, 1248, 660, 222, 14373, 3559, 21117, 292, 14567, 2812, 196, 3581, 197,
  12800, 14335, 1249, 2313, 21853, 15201, 1012, 158, 1329, 22561,
]

const MEMBERSHIP_SORT_ORDER = [
  'sustaining Member',
  'supporting Member',
  'USRN Partner',
  'starting Member',
] as const

const resolveBillingLabel = (member: CoreMember): string => {
  const repoIds = Array.isArray(member.repo_id) ? member.repo_id : [member.repo_id]

  if (repoIds.some((id) => EXCLUDED_REPO_IDS.includes(id))) {
    return 'USRN Partner'
  }

  return `${member.billing_type} Member`
}

export const sortMembers = (a: CoreMember, b: CoreMember): number => {
  const aType = resolveBillingLabel(a)
  const bType = resolveBillingLabel(b)
  const aIndex = MEMBERSHIP_SORT_ORDER.indexOf(
    aType as (typeof MEMBERSHIP_SORT_ORDER)[number],
  )
  const bIndex = MEMBERSHIP_SORT_ORDER.indexOf(
    bType as (typeof MEMBERSHIP_SORT_ORDER)[number],
  )

  if (aIndex === bIndex) {
    return a.organisation_name.localeCompare(b.organisation_name)
  }

  return aIndex - bIndex
}

export const formatMemberStatus = (member: CoreMember): string => resolveBillingLabel(member)

export const isUsrnPartner = (member: CoreMember): boolean => {
  const repoIds = Array.isArray(member.repo_id) ? member.repo_id : [member.repo_id]

  return repoIds.some((id) => EXCLUDED_REPO_IDS.includes(id))
}

export const resolveRepoId = (repoId: number | number[]): number =>
  Array.isArray(repoId) ? repoId[0] : repoId
