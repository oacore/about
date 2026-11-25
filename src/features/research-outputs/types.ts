export type ResearchOutputsNavLink = {
  title: string
  href: string
}

export type ResearchOutputsHeaderLinks = {
  content?: ResearchOutputsNavLink[]
  more?: string
  moreAction?: {
    title?: string
    link?: string
  }
}

export type ResearchOutputsHeaderInner = {
  id?: string
  title?: string
  description?: string
  image?: string
  links?: ResearchOutputsHeaderLinks
}

export type ResearchOutputsHeaderDocument = {
  header?: ResearchOutputsHeaderInner
}

export type PaperCitations = {
  text?: string
  bibtex?: string
}

export type ResearchOutputPaper = {
  id?: string
  type?: string
  title?: string
  author?: string | string[]
  year?: string | number
  booktitle?: string
  editor?: string | string[]
  journal?: string
  volume?: string | number
  number?: string | number
  description?: string
  url?: string
  citations?: PaperCitations
}

export type ResearchOutputsSection = {
  id: string
  title?: string
  subTitle?: string
  caption?: string
  papers?: ResearchOutputPaper[]
}

export type ResearchOutputsSectionsDocument = {
  sections?: ResearchOutputsSection[]
}

export type ResearchOutputsFooterDocument = {
  footer?: string
  action?: {
    text?: string
    href?: string
  }
}

export type ResearchOutputsMeta = {
  id?: string
  title?: string
  tagline?: string
}

export type ResearchOutputsPageData = {
  header?: ResearchOutputsHeaderDocument
  sections?: ResearchOutputsSectionsDocument
  footer?: ResearchOutputsFooterDocument
  meta?: ResearchOutputsMeta
}
