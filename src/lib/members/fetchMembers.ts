import type { CoreMember } from '@features/membership/types'

import { API_URL } from '@config/env'

const MEMBERS_API_URL = process.env.CORE_MEMBERS_API_URL ?? `${API_URL}/members`

const TEST_ORG_PATTERN = /test|demo/i

const resolveCountryName = (code: string | undefined): string => {
  if (!code) return ''

  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code.toUpperCase()) ?? ''
  } catch {
    return ''
  }
}

const normalizeMember = (member: CoreMember): CoreMember => {
  const country = member.country ?? resolveCountryName(member.country_code)

  return {
    ...member,
    country,
  }
}

const isTestOrganisation = (organisationName: string | undefined): boolean => {
  if (!organisationName) return true
  return TEST_ORG_PATTERN.test(organisationName)
}

export const fetchMembers = async (): Promise<CoreMember[]> => {
  const response = await fetch(MEMBERS_API_URL, {
    next: { revalidate: 60 * 60 },
  })

  if (!response.ok) {
    throw new Error(`Could not fetch CORE members: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as CoreMember[] | { data: CoreMember[] }
  const members = Array.isArray(payload) ? payload : payload.data

  return members.map(normalizeMember)
}

export const filterCarouselMembers = (members: CoreMember[]): CoreMember[] =>
  members.filter((member) => {
    const orgName = member.organisation_name?.toLowerCase() ?? ''
    return (
      member.billing_type !== 'starting' &&
      Boolean(orgName) &&
      !isTestOrganisation(orgName)
    )
  })

export const filterListedMembers = (members: CoreMember[]): CoreMember[] =>
  members.filter((member) => !isTestOrganisation(member.organisation_name?.toLowerCase()))
