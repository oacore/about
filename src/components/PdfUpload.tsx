'use client'

import type { PdfUploadProps } from '@core/core-ui'
import dynamic from 'next/dynamic'

// core-ui's PdfUpload (and the upload views it renders) use browser APIs: load it in the browser only
export const PdfUpload = dynamic<PdfUploadProps>(
  () => import('@core/core-ui').then((module) => module.PdfUpload),
  { ssr: false },
)
