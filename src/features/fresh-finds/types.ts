import type { HeaderAction } from '@components/Header/Header'
import type { PageNavSourceLink } from '@components/PageNav/types'

export type FreshFindsAction = {
  caption?: string
  title?: string
  url: string
  variant?: 'contained' | 'outlined' | 'text'
  target?: string
}

export type FreshFindsFeature = {
  title: string
  description: string
  tooltip?: string
  tooltipLabel?: string
}

export type FreshFindsWorkflowStep = {
  step: string
  title: string
  description: string
}

export type FreshFindsUseCase = {
  title: string
  description: string
  user?: string
  position?: string
  img?: string
  action?: FreshFindsAction
}

export type FreshFindsTestimonial = {
  name: string
  role: string
  picture: string
  quote: string
}

export type FreshFindsFaq = {
  id: string
  question: string
  answer: string
}

export type FreshFindsRelatedService = {
  title: string
  picture: string
  url: string
}

/** Shape of `fresh-finds/fresh-finds.yml` in oacore/content (camelized by `getSections`). */
export type FreshFindsContent = {
  meta: {
    title: string
    tagline?: string
  }
  headerLink?: PageNavSourceLink[]
  header: {
    title: string
    icon?: string
    image?: string
    imageAlt?: string
    description?: string
    caption?: string
    actions?: HeaderAction[]
  }
  features?: FreshFindsFeature[]
  howItWorks: {
    title: string
    image?: string
    description?: string
    action?: FreshFindsAction
  }
  workflow: {
    title: string
    image?: string
    imageAlt?: string
    steps: FreshFindsWorkflowStep[]
  }
  start: {
    title: string
    image?: string
    caption?: string
    actions?: FreshFindsAction[]
  }
  useCases?: {
    title: string
    highlight?: string
    items: FreshFindsUseCase[]
  }
  testimonials?: {
    title: string
    items: FreshFindsTestimonial[]
  }
  faqs?: {
    title: string
    expandLabel: string
    collapseLabel: string
    items: FreshFindsFaq[]
  }
  relatedServices: {
    title: string
    services: FreshFindsRelatedService[]
  }
}

export type FreshFindsStatistics = Record<string, string | number>

export type FreshFindsPageData = FreshFindsContent & {
  statistics: FreshFindsStatistics
}
