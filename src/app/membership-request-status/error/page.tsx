import type { Metadata } from 'next'

import { MemberErrorPage, MEMBER_PAGE_CONTENT } from '@features/member'

export const generateMetadata = (): Metadata => ({
  title: MEMBER_PAGE_CONTENT.shortTitle,
  description: MEMBER_PAGE_CONTENT.caption,
})

const MembershipRequestErrorPage = () => <MemberErrorPage textData={MEMBER_PAGE_CONTENT.error} />

export default MembershipRequestErrorPage
