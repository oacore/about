import type { UploadResults } from '@core/core-ui'

export type PdfUploadVariant = 'rights-retention' | 'data-availability' | 'sdg'

export type UploadSectionAction = {
  title: string
  url?: string
}

export type UploadSectionDefault = {
  title?: string
  subTitle?: string
  action?: UploadSectionAction
}

export type UploadSectionResult = {
  title?: string
  description?: string
  image?: string
  action?: UploadSectionAction
}

export type UploadSectionNoSupport = {
  title?: string
  sizeTitle?: string
  image?: string
  action?: string
}

export type UploadSectionSubInfo = {
  format?: string
  size?: string
}

export type UploadSection = {
  default?: UploadSectionDefault
  success?: UploadSectionResult
  fail?: UploadSectionResult
  noSupport?: UploadSectionNoSupport
  subInfo?: UploadSectionSubInfo
}

export type SdgType = {
  id: string
  title: string
  icon: string
  color: string
}

export type SdgPrediction = {
  predictions: string | null
  confidence_score?: number
}

export type SdgUploadResponse = SdgPrediction[]

export type SentenceUploadResponse = UploadResults

export const PDF_UPLOAD_PATHS = {
  'rights-retention': '/internal/data-providers/rights-retention-upload-file',
  'data-availability': '/internal/data-providers/data-access-upload-file',
  sdg: '/internal/sdg-upload-file',
} as const satisfies Record<PdfUploadVariant, string>
