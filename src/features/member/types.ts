export const MEMBER_PLAN_SLUGS = ['starting', 'supporting', 'sustaining'] as const

export type MemberPlanSlug = (typeof MEMBER_PLAN_SLUGS)[number]

export const TYPE_REPO_HAS_ACCOUNT = 'has_account'
export const TYPE_REPO_HAS_EMAIL = 'has_email'
export const TYPE_REPO_ANONYMOUS = 'anonymous'

export type MembershipRepositoryType =
  | typeof TYPE_REPO_HAS_ACCOUNT
  | typeof TYPE_REPO_HAS_EMAIL
  | typeof TYPE_REPO_ANONYMOUS

export type MemberSelectOption = {
  id: string
  name: string
  value?: string | number
  icon?: string
  action?: string
}

export type MemberFormField = {
  id?: string
  type: 'input' | 'select' | 'async-select' | 'checkbox' | 'radio' | 'button' | 'caption'
  label: string
  placeholder?: string
  optional?: boolean
  appendText?: string
  appendTextBottom?: string
  caption?: string
  options?: MemberSelectOption[]
}

export type MemberFormContent = {
  id: string
  maxRepositoriesCount: number
  price: string
  priceCalculated: string
  errorPriceCalculation: string
  action: { caption: string }
  fields: MemberFormField[]
}

export type MemberInfoNote = {
  icon: string
  text: string
}

export type MemberBoxContent = {
  description: string
  action: { active: string; url: string }
}

export type MemberStartingButton = {
  caption: string
  url: string
}

export type MemberStartingStatus = {
  title?: string
  text1: string
  text2: string
  text3: string
  text4?: string
  button1: MemberStartingButton
  button2: MemberStartingButton
  fields?: {
    placeholder: string
    label: string
    id: string
    appendTextBottom?: string
  }
}

export type MemberSuccessContent = {
  title: string
  description: string
  image: { url: string }
  requestStatus: {
    hasAccount: MemberStartingStatus
    hasEmail: MemberStartingStatus
    anonymous: MemberStartingStatus
  }
}

export type MemberErrorContent = {
  title: string
  description: string
  image: { url: string; alt?: string; caption?: string }
  actions: Array<{ caption: string; url: string; variant: 'contained' | 'outlined' }>
}

export type SubmitStartingPayload = {
  evt: { preventDefault: () => void }
  roleInOrganisation?: string
}

export type MemberPageContent = {
  title: string
  shortTitle: string
  caption: string
  form: MemberFormContent
  additionalInfo: MemberInfoNote
  discountInfo: MemberInfoNote
  box: MemberBoxContent
  success: MemberSuccessContent
  error: MemberErrorContent
}

export type MemberPageData = MemberPageContent & {
  planName: MemberPlanSlug
}

export type RepositoryOption = {
  id: number | string
  name: string
  icon?: string
}

export type MembershipPriceData = {
  repository: Array<number | string>
  planName: MemberPlanSlug | ''
  price: number
  priceCalculated: number
  discount: number
  typesContracts?: string
}

export type MembershipPricePayload = MembershipPriceData

export type MembershipPriceResponse = {
  price?: number
}

export type MembershipRequestPayload = Record<string, unknown>

export type MembershipTypeRepositoryResponse = {
  typeRepository?: MembershipRepositoryType
  emailDashboard?: string
  repoName?: string
}

export type MembershipData = {
  price: number
  priceCalculated: number
  discount: number
  planName: MemberPlanSlug | ''
  noRepositories: number
  size: string
  transactionToken: string
  transactionDescription: string
  repoName: string
  typeRepository?: MembershipRepositoryType
  emailDashboard?: string
  roleInOrganisation?: string
  repository?: Array<number | string>
  organisationName?: string
  organisationType?: string
  contactName?: string
  email?: string
  typesContracts?: string
  invoicingFrequency?: string
  additionalInfo?: string
  approveTermsConditions?: number
}

export const isMemberPlanSlug = (slug: string): slug is MemberPlanSlug =>
  MEMBER_PLAN_SLUGS.includes(slug as MemberPlanSlug)
