'use client'

import { DocumentationGuidePage, GRAPH_DOCUMENTATION_TITLE } from '@features/Documentation/guide'
import type { GraphDocumentationPageProps } from '@features/Documentation/graph-documentation/types'

const GraphDocumentationPage = ({ docs, navigation }: GraphDocumentationPageProps) => (
  <DocumentationGuidePage
    docs={docs.items}
    docsTitle={GRAPH_DOCUMENTATION_TITLE}
    navigation={navigation}
    tutorial={docs.tutorial}
  />
)

export default GraphDocumentationPage
