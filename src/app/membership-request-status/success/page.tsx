import type { Metadata } from 'next'

import { MemberSuccessPage, MEMBER_PAGE_CONTENT } from '@features/member'

export const generateMetadata = (): Metadata => ({
  title: MEMBER_PAGE_CONTENT.shortTitle,
  description: MEMBER_PAGE_CONTENT.caption,
})

const MembershipRequestSuccessPage = () => (
  <MemberSuccessPage textData={MEMBER_PAGE_CONTENT.success} />
)

export default MembershipRequestSuccessPage
