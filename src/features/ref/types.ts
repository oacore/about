import type { ServiceMainWrapperService } from '@components/ServiceMainWrapper'

export type RefNavLink = {
  title: string
  href: string
}

export type RefHeaderActionSide = {
  text?: string
  action?: {
    title?: string
    link?: string
  }
}

export type RefHeaderActions = {
  left?: RefHeaderActionSide
  right?: RefHeaderActionSide
}

export type RefHeaderInner = {
  id?: string
  title?: string
  description?: string
  image?: string
  links?: {
    content?: RefNavLink[]
  }
  actions?: RefHeaderActions
}

export type RefHeaderDocument = {
  header?: RefHeaderInner
}

export type RefSectionImage = {
  item: string
}

export type RefSectionItem = {
  title?: string
  description?: string
}

export type RefSection = {
  id: string
  title?: string
  caption?: string
  content?: string
  content2?: string
  subContent?: string
  subContent2?: string
  subHeader?: string
  subHeaderContent?: string
  images?: RefSectionImage[]
  items?: RefSectionItem[]
}

export type RefSectionsDocument = {
  sections?: RefSection[]
}

export type RefFooterDocument = {
  footer?: string
  action?: {
    text?: string
    href?: string
  }
}

export type RefMeta = {
  id?: string
  title?: string
  tagline?: string
}

/** Shape returned by `loadRefPage()`. */
export type RefPageData = {
  header?: RefHeaderDocument
  sections?: RefSectionsDocument
  footer?: RefFooterDocument
  meta?: RefMeta
  services?: ServiceMainWrapperService[]
}
