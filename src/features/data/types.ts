export type DataPageAction = {
  title?: string
  caption?: string
  url: string
}

export type DataPageGuideline = {
  title?: string
  picture?: string
  description?: string
  action?: DataPageAction
}

export type DataPageServiceLink = {
  type?: string
  link?: string
  image?: string
}

export type DataPageStat = {
  title?: string
  description?: string
}

export type DataPageSection = {
  title?: string
  content?: string
  image?: string
  subTitle?: string
  link?: DataPageAction
  data?: DataPageServiceLink[]
  stats?: DataPageStat[]
}

export type DataPageStatistics = Record<string, string | number>

/** Shape returned by `getSections('data')` plus live CORE statistics. */
export type DataPageData = {
  id?: string
  title?: string
  description?: string
  keywords?: string
  headline?: string
  tagline?: string
  disclaimer?: string
  guideline?: DataPageGuideline
  sections?: DataPageSection[]
  statistics?: DataPageStatistics
}
