import type { UploadTexts } from '@core/core-ui'

import type { PdfUploadVariant, UploadSection } from '@components/PdfUpload/types'

const UPLOAD_TEXT_DEFAULTS: Record<
  PdfUploadVariant,
  Pick<UploadTexts, 'success' | 'fail' | 'error'>
> = {
  'rights-retention': {
    success: { title: 'RRS found' },
    fail: {
      title: 'RRS not found',
      description: 'RRS was not found in this paper.',
    },
    error: {
      title: 'Upload failed',
      description: 'The upload could not be completed.',
    },
  },
  'data-availability': {
    success: { title: 'Data access statement found' },
    fail: {
      title: 'Data access statement not found',
      description: 'Data access statement was not found in this paper.',
    },
    error: {
      title: 'Upload failed',
      description: 'The upload could not be completed.',
    },
  },
  sdg: {
    success: { title: 'SDG labels found' },
    fail: {
      title: 'SDG labels not found',
      description: 'SDG labels not found in this paper.',
    },
    error: {
      title: 'Upload failed',
      description: 'The upload could not be completed.',
    },
  },
}

export const mapUploadTexts = (
  upload: UploadSection | undefined,
  variant: PdfUploadVariant,
): UploadTexts => {
  const defaults = UPLOAD_TEXT_DEFAULTS[variant]

  return {
    default: {
      subTitle: upload?.default?.subTitle ?? 'Drag and drop your file here',
      button: upload?.default?.action?.title ?? 'Browse files',
    },
    success: {
      title: upload?.success?.title ?? defaults.success.title,
      button: upload?.success?.action?.title ?? 'Upload new file',
    },
    fail: {
      title: upload?.fail?.title ?? defaults.fail.title,
      description: upload?.fail?.description ?? defaults.fail.description,
      button: upload?.fail?.action?.title ?? 'Upload new file',
    },
    error: {
      title: upload?.fail?.title ?? defaults.error.title,
      description: upload?.fail?.description ?? defaults.error.description,
      button: upload?.fail?.action?.title ?? 'Upload new file',
    },
    noSupport: {
      title: upload?.noSupport?.title ?? 'This format is not supported',
      sizeTitle: upload?.noSupport?.sizeTitle ?? 'File is too big',
      button: upload?.noSupport?.action ?? 'Upload new file',
    },
    subInfo: {
      format: upload?.subInfo?.format ?? 'Supported formats: pdf',
      size: upload?.subInfo?.size ?? 'Maximum size: 10MB',
    },
  }
}
