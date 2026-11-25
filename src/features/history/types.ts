export type HistoryMilestoneLink = {
  href?: string
  type?: string
  label?: string
  description?: string
}

export type HistoryMilestoneImage = {
  src: string
  alt?: string
}

export type HistoryMilestoneDate = {
  numeric: string
  long: string
}

export type HistoryMilestone = {
  id: string
  title?: string
  body?: string
  date: HistoryMilestoneDate
  image?: HistoryMilestoneImage
  link?: HistoryMilestoneLink
}

/** Shape returned by `loadHistoryPage` from `oacore/content` `history/`. */
export type HistoryPageData = {
  milestones: HistoryMilestone[]
  statistics?: Record<string, string | number>
}
