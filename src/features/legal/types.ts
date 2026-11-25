export type LegalNavLink = {
  title: string
  href: string
}

export type LegalMainSection = {
  title: string
  id?: string
  content: string
  subtitle?: string | boolean
}

export type LegalHeaderAction = {
  caption?: string
  url?: string
  variant?: string
  target?: string
}

export type LegalHeader = {
  title?: string
  description?: string
  actions?: LegalHeaderAction[]
}

/** Shape returned by `getSections('terms-conditions' | 'modern-slavery' | 'gep')`. */
export type LegalPageData = {
  header?: LegalHeader
  links?: { content?: LegalNavLink[] }
  main?: LegalMainSection[]
}
