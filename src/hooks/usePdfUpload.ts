'use client'

import { useCallback, useMemo, useState } from 'react'
import type { UploadResults } from '@core/core-ui'

import { API_URL } from '@config/env'

import {
  PDF_UPLOAD_PATHS,
  type PdfUploadVariant,
  type SdgUploadResponse,
} from '@components/PdfUpload/types'

// API_URL follows APP_ENV (dev/staging/prod), like the old app's process.env.API_URL
const getUploadUrl = (variant: PdfUploadVariant): string =>
  new URL(PDF_UPLOAD_PATHS[variant], API_URL).toString()

type UsePdfUploadOptions = {
  variant: PdfUploadVariant
}

type UsePdfUploadReturn<T> = {
  uploadResult: T
  loading: boolean
  handleResetResults: () => void
  handleUploadPdf: (file: File) => Promise<void>
}

export function usePdfUpload(options: { variant: 'sdg' }): UsePdfUploadReturn<SdgUploadResponse>
export function usePdfUpload(
  options: { variant: 'rights-retention' | 'data-availability' },
): UsePdfUploadReturn<UploadResults>
export function usePdfUpload({
  variant,
}: UsePdfUploadOptions): UsePdfUploadReturn<UploadResults | SdgUploadResponse> {
  const emptyResult = useMemo(
    () => (variant === 'sdg' ? [] : {}) as UploadResults | SdgUploadResponse,
    [variant],
  )
  const [uploadResult, setUploadResult] = useState<UploadResults | SdgUploadResponse>(emptyResult)
  const [loading, setLoading] = useState(false)

  const handleResetResults = useCallback(() => {
    setUploadResult(emptyResult)
  }, [emptyResult])

  const handleUploadPdf = useCallback(
    async (file: File) => {
      setLoading(true)

      try {
        const formData = new FormData()
        formData.set('file', file)

        const response = await fetch(getUploadUrl(variant), {
          method: 'POST',
          credentials: 'same-origin',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const result = (await response.json()) as UploadResults | SdgUploadResponse
        setUploadResult(result)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [variant],
  )

  return {
    uploadResult,
    loading,
    handleResetResults,
    handleUploadPdf,
  }
}
