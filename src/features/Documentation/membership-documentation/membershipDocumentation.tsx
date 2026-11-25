'use client'

import {
  DocumentationGuidePage,
  MEMBERSHIP_DOCUMENTATION_TITLE,
} from '@features/Documentation/guide'
import type { MembershipDocumentationPageProps } from '@features/Documentation/membership-documentation/types'

const MembershipDocumentationPage = ({ docs, navigation }: MembershipDocumentationPageProps) => (
  <DocumentationGuidePage
    docs={docs.items}
    docsTitle={MEMBERSHIP_DOCUMENTATION_TITLE}
    navigation={navigation}
    tutorial={docs.tutorial}
  />
)

export default MembershipDocumentationPage
