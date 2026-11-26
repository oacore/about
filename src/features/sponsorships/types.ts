import type { ServicePageAction } from '@components/pages/types'
import type { MembershipComparisonTable } from '@features/membership/types'

export type SponsorshipHeader = {
  id?: string
  title: string
  description: string
  logo?: string
  actions?: ServicePageAction[]
}

export type SponsorshipLogoItem = {
  img: string
  alt?: string
  label?: string
  background?: string
}

export type SponsorshipFeature = {
  title: string
  description: string
}

export type SponsorshipHowToSponsor = {
  title: string
  image?: string
  description: string
  action?: { title: string; url: string }
  types?: Array<{ title: string }>
}

export type SponsorshipDiscountRow = {
  title?: string
  period: string
  discount: string
}

export type SponsorshipDiscount = {
  title: string
  table: {
    headers: Array<{ name: string }>
    rows: SponsorshipDiscountRow[]
  }
}

export type SponsorshipContact = {
  title: string
  image?: string
  description: string
  action: { title: string; url: string }
}

export type SponsorshipComparisonTable = MembershipComparisonTable & {
  warning?: string
}

export type SponsorshipPageData = {
  meta?: {
    id?: string
    title?: string
    tagline?: string
  }
  header?: {
    header: SponsorshipHeader
  }
  logos?: {
    logos: {
      items: SponsorshipLogoItem[]
    }
  }
  features?: {
    features: {
      title: string
      services: SponsorshipFeature[]
    }
  }
  howToSponsor?: {
    howToSponsor: SponsorshipHowToSponsor
  }
  table?: {
    table: {
      comparisonTable: SponsorshipComparisonTable
    }
  }
  discount?: {
    discount: SponsorshipDiscount
  }
  contact?: {
    contactUs: SponsorshipContact
  }
}
