import type { OutreachMaterial, OutreachMaterialOption } from '@components/outreach-materials/types'
import type { CoreStatistics } from '@/lib/statistics/fetchCoreStatistics'

export type AboutAction = {
  label?: string
  href?: string
}

export type AboutVideo = {
  src: string
  title: string
}

export type AboutMeta = {
  title?: string
  headline?: string
  description?: string
  tagline?: string
  keywords?: string | string[]
}

export type AboutRelatedSection = {
  title?: string
  shortTitle?: string
  description?: string
  body?: string
  iconUrl?: string
  actionLabel?: string
  urlRedirect?: string
  href?: string
  extraAction?: AboutAction
}

export type AboutCoreSection = {
  title?: string
  description?: string
}

export type AboutBlogSection = {
  title?: string
  shortTitle?: string
  actionLabel?: string
}

export type AboutMissionSection = {
  title?: string
  shortTitle?: string
  body?: string
  video?: AboutVideo
}

export type AboutYearsActiveSection = {
  title?: string
  description?: string
}

export type AboutHowItWorksSection = {
  title?: string
  shortTitle?: string
  body?: string
  actionLabels?: {
    primary?: string
    secondary?: string
  }
}

export type AboutTeamCopy = {
  title?: string
  shortTitle?: string
}

export type AboutResourcesCopy = {
  title?: string
  shortTitle?: string
  content?: string
  body?: string
}

export type AboutBlogPost = {
  title: string
  link: string
  pubDate?: string
}

export type AboutTeamMember = {
  id: string
  name: string
  role?: string
  description?: string
  photoUrl?: string
  order?: number
}

export type AboutPastTeamMember = {
  id: string
  name: string
}

export type AboutTeamMembers = {
  current: AboutTeamMember[]
  past: AboutPastTeamMember[]
}

export type AboutContactCase = {
  slug: string
  purpose: string
  description?: string
}

export type AboutContacts = {
  title?: string
  shortTitle?: string
  cases: AboutContactCase[]
  outro?: string | null
}

export type AboutResourceOption = OutreachMaterialOption
export type AboutResource = OutreachMaterial

export type AboutBadgeImage = {
  file: string
  source?: string | null
}

export type AboutBadge = {
  id?: string
  title?: string
  descriptionAbout?: string
  images?: AboutBadgeImage[]
}

export type AboutServiceFeature = {
  id: string
  title: string
  shortDescription?: string
  action?: {
    url: string
  }
}

export type AboutServiceSection = {
  id: string
  title: string
  features: AboutServiceFeature[]
}

export type AboutPageData = {
  meta?: AboutMeta
  core?: AboutCoreSection
  blog?: AboutBlogSection
  blogPosts: AboutBlogPost[]
  characteristics?: AboutRelatedSection
  mission?: AboutMissionSection
  fair?: AboutRelatedSection
  yearsActive?: AboutYearsActiveSection
  endorsements?: AboutRelatedSection
  howItWorks?: AboutHowItWorksSection
  communities?: AboutRelatedSection
  services?: AboutRelatedSection
  serviceSections: AboutServiceSection[]
  research?: AboutRelatedSection
  team?: AboutTeamCopy
  teamMembers: AboutTeamMembers
  resources?: AboutResourcesCopy
  materials: AboutResource[]
  contacts: AboutContacts
  badges?: AboutBadge
  statistics: CoreStatistics
}
