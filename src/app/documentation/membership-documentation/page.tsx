import type { Metadata } from 'next'

import { MembershipDocumentationPage } from '@features/Documentation/membership-documentation'

import { loadMembershipDocumentationPage } from './loadMembershipDocumentationPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await loadMembershipDocumentationPage()

  return {
    title: meta?.title,
    description: meta?.description ?? meta?.tagline,
  }
}

const MembershipDocumentationRoutePage = async () => {
  const { docs, navigation } = await loadMembershipDocumentationPage()

  return <MembershipDocumentationPage docs={docs} navigation={navigation} />
}

export default MembershipDocumentationRoutePage
