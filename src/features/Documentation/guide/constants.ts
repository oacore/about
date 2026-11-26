export const DATA_PROVIDERS_GUIDE_TITLE = 'CORE Data Provider’s Guide'
export const MEMBERSHIP_DOCUMENTATION_TITLE = 'Membership Documentation'
export const FAIR_CERTIFICATION_DOCUMENTATION_TITLE = 'FAIR Repository Certification Documentation'
export const GRAPH_DOCUMENTATION_TITLE = 'CORE Graph API Documentation'

export const DATA_PROVIDERS_GUIDE_HREF = '/documentation/data-providers-guide'
export const MEMBERSHIP_DOCUMENTATION_HREF = '/documentation/membership-documentation'
export const FAIR_CERTIFICATION_DOCUMENTATION_HREF = '/documentation/fair-repository-certification'
export const GRAPH_DOCUMENTATION_HREF = '/documentation/graph-documentation'

export const DOCUMENTATION_SWITCHER_OPTIONS = [
  { title: DATA_PROVIDERS_GUIDE_TITLE, href: DATA_PROVIDERS_GUIDE_HREF },
  { title: MEMBERSHIP_DOCUMENTATION_TITLE, href: MEMBERSHIP_DOCUMENTATION_HREF },
  { title: FAIR_CERTIFICATION_DOCUMENTATION_TITLE, href: FAIR_CERTIFICATION_DOCUMENTATION_HREF },
  // Graph API documentation is disabled (see src/app/documentation/graph-documentation/page.tsx).
  // Uncomment together with that route when it is ready to go live.
  // { title: GRAPH_DOCUMENTATION_TITLE, href: GRAPH_DOCUMENTATION_HREF },
] as const

export const DOCUMENTATION_SWITCHER_TITLES = DOCUMENTATION_SWITCHER_OPTIONS.map(
  (option) => option.title,
)
