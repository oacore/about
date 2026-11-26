'use client'

import {
  DATA_PROVIDERS_GUIDE_TITLE,
  DocumentationGuidePage,
} from '@features/Documentation/guide'
import type { DataProvidersGuidePageProps } from '@features/Documentation/data-providers-guide/types'

const DataProvidersGuidePage = ({ docs, navigation }: DataProvidersGuidePageProps) => (
  <DocumentationGuidePage
    docs={docs.items}
    docsTitle={DATA_PROVIDERS_GUIDE_TITLE}
    imageSource
    navigation={navigation}
    tutorial={docs.tutorial}
  />
)

export default DataProvidersGuidePage
