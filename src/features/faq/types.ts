export type FaqAction = {
  title?: string
  url: string
}

export type FaqGuideline = {
  title?: string
  picture?: string
  description?: string
  action?: FaqAction
}

export type FaqBadgeImage = {
  file: string
  source?: string | null
}

export type FaqBadge = {
  title?: string
  id?: string
  description?: string
  images?: FaqBadgeImage[]
}

export type FaqItem = {
  slug: string
  question: string
  answer?: string
  badge?: FaqBadge[]
}

export type FaqSectionData = {
  id: string
  title?: string
  updateDate?: string
  caption?: string
  guideline?: FaqGuideline
  items?: FaqItem[]
  sections?: FaqSectionData[]
}

export type FaqPageData = {
  title?: string
  description?: string
  sections?: FaqSectionData[]
}

export type FaqHeadingLevel = 2 | 3 | 4 | 5
