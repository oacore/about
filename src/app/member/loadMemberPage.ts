import { cache } from 'react'

import { MEMBER_PAGE_CONTENT, MEMBER_PLAN_SLUGS, isMemberPlanSlug } from '@features/member'
import type { MemberPageData, MemberPlanSlug } from '@features/member'

export const getMemberPlanSlugs = (): MemberPlanSlug[] => [...MEMBER_PLAN_SLUGS]

export { isMemberPlanSlug }

export const loadMemberPage = cache(async (slug: MemberPlanSlug): Promise<MemberPageData> => ({
  ...MEMBER_PAGE_CONTENT,
  planName: slug,
}))
