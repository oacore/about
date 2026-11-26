export type OaiResolverSectionBlock = {
  id?: string
  description: string
}

export type OaiResolverResolveSection = {
  title?: string
  picture?: string
  logo?: string
}

export type OaiResolverSections = {
  blocks?: OaiResolverSectionBlock[]
}

/** Shape returned by `getSections('oai-resolver')`. */
export type OaiResolverPageData = {
  title?: string
  description?: string
  keywords?: string | string[]
  resolve?: OaiResolverResolveSection
  sections?: OaiResolverSections
}
