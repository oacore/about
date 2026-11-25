import type { FaqItem } from '@features/faq/types'

export type BenefitsNavLink = {
  link?: string
  href?: string
}

export type BenefitsAction = {
  title?: string
  url?: string
  text?: string
}

export type BenefitsGuideline = {
  title?: string
  picture?: string
  description?: string
  action?: BenefitsAction
}

export type BenefitsBanner = {
  title?: string
  description?: string
  actions?: {
    links?: {
      form?: {
        url?: string
        text?: string
      }
      Link?: {
        url?: string
        text?: string
      }
    }
  }
  guideline?: BenefitsGuideline
}

export type BenefitsJoinAdditional = {
  Info?: string
  picture?: string
  href?: string
}

export type BenefitsJoinBlock = {
  id?: string
  title?: string
  picture?: string
  description?: string
  additional?: BenefitsJoinAdditional
}

export type BenefitsSections = {
  title?: string
  blocks?: BenefitsJoinBlock[]
}

export type BenefitsStatBlock = {
  title?: string
  value?: string
}

export type BenefitsStatistics = {
  title?: string
  blocks?: BenefitsStatBlock[]
}

export type BenefitsHowToItem = {
  title?: string
  titlePicture?: string
  description?: string
  picture?: string
}

/** CMS key stays `HowTo` because content camelizing only rewrites `-` and `_`. */
export type BenefitsHowTo = {
  title?: string
  items?: BenefitsHowToItem[]
  action?: BenefitsAction
}

export type BenefitsJoin = {
  title?: string
  description?: string
  picture?: string
  action?: string
  subOai?: string
}

export type BenefitsService = {
  title?: string
  picture?: string
  description?: string
  action?: BenefitsAction[]
}

export type BenefitsSecondStep = {
  title?: string
  member?: {
    subTitle?: string
  }
  newMember?: {
    subTitle?: string
    picture?: string
    description?: string
  }
  issue?: {
    subTitle?: string
    description?: string
  }
}

/** Shape returned by `getSections('benefits')`. */
export type BenefitsContent = {
  title?: string
  description?: string
  headerLink?: BenefitsNavLink[]
  banner?: BenefitsBanner
  sections?: BenefitsSections
  stat?: BenefitsStatistics
  HowTo?: BenefitsHowTo
  join?: BenefitsJoin
  services?: BenefitsService[]
  secondStep?: BenefitsSecondStep
}

export type BenefitsPageData = BenefitsContent & {
  statistics?: Record<string, string | number>
  faqItems: FaqItem[]
}
