export type SdgAction = {
  title: string
  url?: string
}

export type SdgUploadDefault = {
  title?: string
  subTitle?: string
  action?: SdgAction
}

export type SdgUploadResult = {
  title?: string
  description?: string
  image?: string
  action?: SdgAction
}

export type SdgUploadNoSupport = {
  title?: string
  sizeTitle?: string
  image?: string
  action?: string
}

export type SdgUploadSubInfo = {
  format?: string
  size?: string
}

export type SdgUploadSection = {
  default?: SdgUploadDefault
  success?: SdgUploadResult
  fail?: SdgUploadResult
  noSupport?: SdgUploadNoSupport
  subInfo?: SdgUploadSubInfo
}

export type SdgHeaderInner = {
  title?: string
  description?: string
  subTitle?: string
  image?: string
}

export type SdgHeaderDocument = {
  header?: SdgHeaderInner
}

export type SdgHowItWorksInner = {
  title?: string
  description?: string
  image?: string
}

export type SdgHowItWorksDocument = {
  howItWorks?: SdgHowItWorksInner
}

export type { SdgPrediction, SdgType, SdgUploadResponse } from '@components/PdfUpload/types'

/** Shape returned by `getSections('sdg')` (matches oacore/content `sdg/` bundle). */
export type SdgPageData = {
  header?: SdgHeaderDocument
  upload?: {
    upload?: SdgUploadSection
  }
  howItWorks?: SdgHowItWorksDocument
}
