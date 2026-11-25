export { default as DocumentationGuidePage } from './DocumentationGuidePage'
export type { DocumentationGuidePageProps } from './DocumentationGuidePage'
export {
  DATA_PROVIDERS_GUIDE_TITLE,
  FAIR_CERTIFICATION_DOCUMENTATION_TITLE,
  GRAPH_DOCUMENTATION_TITLE,
  MEMBERSHIP_DOCUMENTATION_TITLE,
} from './constants'
// The guide itself lives in core-ui (also used by the dashboard). Data helpers come from the
// server-safe entry: the page loaders run on the server
export { getDocumentationGuideData } from '@core/core-ui/utils'
export type {
  DocsImage,
  DocsItem,
  DocsNavItem,
  DocsRedirect,
  DocsTutorial,
  DocumentationGuideDocs,
  DocumentationGuideMeta,
  DocumentationGuidePageData,
} from '@core/core-ui'
