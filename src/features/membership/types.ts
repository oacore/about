import type { ServicePageAction, ServicePageVideo } from '@components/pages/types'

export type MembershipPlanSlug = 'supporting' | 'sustaining'

export const MEMBERSHIP_PLAN_SLUGS: MembershipPlanSlug[] = ['supporting', 'sustaining']

export type MembershipAdvantage = {
  id: number
  title: string
  descriptionCardCard?: string
  descriptionCardTable?: string
  video?: ServicePageVideo & { image?: string }
  plans?: string[]
}

export type MembershipPlanCard = {
  title: string
  caption?: string
  box?: { title: string; caption: string }
  advantages: MembershipAdvantage[]
  action: { title: string; url: string }
  subscribe?: string
}

export type MembershipComparisonRow = {
  id?: number
  title: string
  descriptionCardTable?: string
  plans?: string[]
  captions?: Array<{ plan: string; name: string }>
}

export type MembershipComparisonHeader = {
  name: string
  defaultText?: string
  status?: string
}

export type MembershipComparisonTable = {
  title: string
  headers: MembershipComparisonHeader[]
  rows: MembershipComparisonRow[]
}

export type MembershipFeePrice = {
  type?: string
  deal?: string
  original?: number | string
  discount?: number | string
  indicator?: boolean
}

export type MembershipFeeRow = {
  title?: string
  caption?: string
  prices?: MembershipFeePrice[]
  subRows?: MembershipFeeRow[]
}

export type MembershipFeeHeader = {
  name: string
  type?: string
  defaultText?: string
  url?: string
  status?: string
  caption?: string
  action?: { url: string; caption: string }
  selectedText?: string
}

export type MembershipFeeTable = {
  headers: MembershipFeeHeader[]
  rows: MembershipFeeRow[]
  supporting?: { rows: MembershipFeeRow[]; subRows?: MembershipFeeRow[] }
  sustaining?: { rows: MembershipFeeRow[]; subRows?: MembershipFeeRow[] }
}

export type MembershipPageData = {
  headerLink?: { headerLink: Array<{ href: string; link: string }> }
  header?: {
    header: {
      title: string
      description: string
      logo?: string
      actions?: ServicePageAction[]
    }
  }
  plan?: {
    table: {
      plans: {
        title: string
        cardsDescription: Array<{ title: string; content: string }>
        cards: MembershipPlanCard[]
      }
      comparisonTable: MembershipComparisonTable
    }
  }
  carousel?: {
    carousel: {
      items: Array<{ img: string; alt?: string }>
      action: { url: string }
    }
  }
  box?: { box: { description: string; action: { default: string; active: string } } }
  howItWorks?: {
    howItWorks: {
      title: string
      description: string
      image?: string
      actions: Array<{
        action: { url?: string; default: string; active: string; caption?: string }
      }>
    }
  }
  support?: {
    support: {
      title: string
      description: string
      cards: Array<{ title: string; caption: string; img?: string }>
    }
  }
  benefits?: {
    institutionBenefit: {
      title: string
      item: Array<{
        title: string
        description: string
        user: string
        position: string
        img: string
        action?: { title: string; url: string }
      }>
    }
  }
  materials?: {
    materials: {
      title: string
      cards: Array<{
        key: string
        title: string
        image: string
        video?: ServicePageVideo
        action: { caption: string; url: string; target?: string }
      }>
    }
  }
  fee?: {
    fee: {
      title: string
      caption?: string
      warning?: string
      description: Record<MembershipPlanSlug, string>
      subDescription?: Record<MembershipPlanSlug, string>
      note: Record<MembershipPlanSlug, string>
      subNote?: string
      noteSecond?: string
      action: { caption: string; url: string; googleForm?: string }
      table: MembershipFeeTable
    }
  }
}

export type CoreMember = {
  organisation_id: number
  billing_type: string
  organisation_name: string
  repo_id: number | number[]
  country_code?: string
  country?: string
}

export type MembershipFeeContent = NonNullable<MembershipPageData['fee']>['fee']

export type MembershipBoxContent = NonNullable<MembershipPageData['box']>['box']

export type MembershipPricesPageData = {
  header: {
    title: string
    description: string
    subDescription?: string
    note?: string
  }
  fee: MembershipFeeContent
  planName: MembershipPlanSlug
  comparisonTable: MembershipComparisonTable
  box?: MembershipBoxContent
  googleForm?: string
}

export type MembershipAnnualFeesPageData = {
  header: {
    title: string
    planName: MembershipPlanSlug
  }
  fee: {
    title: string
    warning?: string
    subNote?: string
    table: {
      headers: MembershipFeeTable['headers']
      rows: MembershipFeeRow[]
    }
  }
  planName: MembershipPlanSlug
}
