'use client'

import { DocumentationGuidePage, FAIR_CERTIFICATION_DOCUMENTATION_TITLE } from '@features/Documentation/guide'
import type { FairRepositoryCertificationPageProps } from '@features/Documentation/fair-repository-certification/types'

const FairRepositoryCertificationPage = ({ docs, navigation }: FairRepositoryCertificationPageProps) => (
  <DocumentationGuidePage
    docs={docs.items}
    docsTitle={FAIR_CERTIFICATION_DOCUMENTATION_TITLE}
    navigation={navigation}
    tutorial={docs.tutorial}
  />
)

export default FairRepositoryCertificationPage
