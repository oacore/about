import type { Metadata } from 'next'

import { MembershipPage } from '@features/membership'

import { loadMembershipPage } from './loadMembershipPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadMembershipPage()

  return {
    title: page.header?.header.title,
    description: page.header?.header.description,
  }
}

const MembershipRoutePage = async () => {
  const { page, members, allMembers } = await loadMembershipPage()

  return <MembershipPage allMembers={allMembers} data={page} members={members} />
}

export default MembershipRoutePage
