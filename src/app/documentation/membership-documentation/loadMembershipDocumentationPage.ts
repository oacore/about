import { cache } from 'react'

import { getSections } from 'content'

import { getDocumentationGuideData } from '@features/Documentation/guide'
import type { MembershipDocumentationPageData } from '@features/Documentation/membership-documentation'

export const loadMembershipDocumentationPage = cache(
  async (): Promise<MembershipDocumentationPageData> => {
    const content = await getSections('docs-membership')

    return getDocumentationGuideData(content, 'docs', ['headerDashboard'])
  },
)
