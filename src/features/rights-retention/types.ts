import type { UploadResults } from '@core/core-ui'

import type {
  BecomeMemberAction,
  BecomeMemberSectionData,
  BecomeMemberService,
} from '@components/BecomeMemberSection'

export type RightsRetentionAction = BecomeMemberAction

export type RightsRetentionUploadDefault = {
  title?: string
  subTitle?: string
  action?: RightsRetentionAction
}

export type RightsRetentionUploadResult = {
  title?: string
  description?: string
  image?: string
  action?: RightsRetentionAction
}

export type RightsRetentionUploadNoSupport = {
  title?: string
  sizeTitle?: string
  image?: string
  action?: string
}

export type RightsRetentionUploadSubInfo = {
  format?: string
  size?: string
}

export type RightsRetentionUploadSection = {
  default?: RightsRetentionUploadDefault
  success?: RightsRetentionUploadResult
  fail?: RightsRetentionUploadResult
  noSupport?: RightsRetentionUploadNoSupport
  subInfo?: RightsRetentionUploadSubInfo
}

export type RightsRetentionHeaderInner = {
  title?: string
  description?: string
  subTitle?: string
}

export type RightsRetentionHeaderDocument = {
  header?: RightsRetentionHeaderInner
}

export type RightsRetentionHowItWorksInner = {
  title?: string
  description?: string
  image?: string
}

export type RightsRetentionHowItWorksDocument = {
  howItWorks?: RightsRetentionHowItWorksInner
}

export type RightsRetentionMemberServices = BecomeMemberService

export type RightsRetentionBecomeMember = BecomeMemberSectionData

export type RightsRetentionMemberDocument = {
  becomeMember?: RightsRetentionBecomeMember
}

/** Shape returned by `getSections('rrs')` (matches oacore/content `rrs/` bundle). */
export type RightsRetentionPageData = {
  header?: RightsRetentionHeaderDocument
  upload?: {
    upload?: RightsRetentionUploadSection
  }
  howItWorks?: RightsRetentionHowItWorksDocument
  member?: RightsRetentionMemberDocument
}

export type RightsRetentionUploadResponse = UploadResults
