import type { UploadResults } from '@core/core-ui'

import type {
  BecomeMemberAction,
  BecomeMemberSectionData,
  BecomeMemberService,
} from '@components/BecomeMemberSection'

export type DataAvailabilityAction = BecomeMemberAction

export type DataAvailabilityUploadDefault = {
  title?: string
  subTitle?: string
  action?: DataAvailabilityAction
}

export type DataAvailabilityUploadResult = {
  title?: string
  description?: string
  image?: string
  action?: DataAvailabilityAction
}

export type DataAvailabilityUploadNoSupport = {
  title?: string
  sizeTitle?: string
  image?: string
  action?: string
}

export type DataAvailabilityUploadSubInfo = {
  format?: string
  size?: string
}

export type DataAvailabilityUploadSection = {
  default?: DataAvailabilityUploadDefault
  success?: DataAvailabilityUploadResult
  fail?: DataAvailabilityUploadResult
  noSupport?: DataAvailabilityUploadNoSupport
  subInfo?: DataAvailabilityUploadSubInfo
}

export type DataAvailabilityHeaderInner = {
  title?: string
  description?: string
  subTitle?: string
}

export type DataAvailabilityHeaderDocument = {
  header?: DataAvailabilityHeaderInner
}

export type DataAvailabilityHowItWorksInner = {
  title?: string
  description?: string
  image?: string
}

export type DataAvailabilityHowItWorksDocument = {
  howItWorks?: DataAvailabilityHowItWorksInner
}

export type DataAvailabilityMemberServices = BecomeMemberService

export type DataAvailabilityBecomeMember = BecomeMemberSectionData

export type DataAvailabilityMemberDocument = {
  becomeMember?: DataAvailabilityBecomeMember
}

/** Shape returned by `getSections('das')` (matches oacore/content `das/` bundle). */
export type DataAvailabilityPageData = {
  header?: DataAvailabilityHeaderDocument
  upload?: {
    upload?: DataAvailabilityUploadSection
  }
  howItWorks?: DataAvailabilityHowItWorksDocument
  member?: DataAvailabilityMemberDocument
}

export type DataAvailabilityUploadResponse = UploadResults
