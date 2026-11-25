'use client'

import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { Card } from 'antd'
import type { UploadProps, RcFile } from 'antd/es/upload'
import type { UploadResults } from '@core/core-ui'
import '@core/core-ui/styles'

import SdgUploadSuccess from '@components/PdfUpload/SdgUploadSuccess'
import { mapUploadTexts } from '@components/PdfUpload/uploadTexts'
import type {
  PdfUploadVariant,
  SdgPrediction,
  SdgType,
  SdgUploadResponse,
  UploadSection,
} from '@components/PdfUpload/types'

import styles from './PdfUpload.module.css'

const CrPdfUpload = dynamic(
  () => import('@core/core-ui').then((module) => module.CrPdfUpload),
  { ssr: false },
)

const DefaultUploadView = dynamic(
  () => import('@core/core-ui').then((module) => module.DefaultUploadView),
  { ssr: false },
)

const FailUploadView = dynamic(
  () => import('@core/core-ui').then((module) => module.FailUploadView),
  { ssr: false },
)

const FormatIssueView = dynamic(
  () => import('@core/core-ui').then((module) => module.FormatIssueView),
  { ssr: false },
)

const SizeIssueView = dynamic(
  () => import('@core/core-ui').then((module) => module.SizeIssueView),
  { ssr: false },
)

const ACCEPTED_FORMATS = ['application/pdf']
const MAX_FILE_SIZE_MB = 10

type SdgViewState = 'default' | 'success' | 'fail' | 'sizeIssue' | 'formatIssue'

type BasePdfUploadProps = {
  data?: UploadSection
  loading: boolean
  onResetResults: () => void
  uploadPdf: (file: File) => Promise<void>
}

type SentencePdfUploadProps = BasePdfUploadProps & {
  variant: 'rights-retention' | 'data-availability'
  uploadResults: UploadResults
}

type SdgPdfUploadProps = BasePdfUploadProps & {
  variant: 'sdg'
  sdgTypes: SdgType[]
  uploadResults: SdgUploadResponse
}

export type PdfUploadProps = SentencePdfUploadProps | SdgPdfUploadProps

const resolveFoundSentence = (
  uploadResults: UploadResults,
  variant: 'rights-retention' | 'data-availability',
): string | null => {
  if (variant === 'rights-retention') {
    return (uploadResults.rightsRetentionSentence as string | null | undefined) ?? null
  }

  return (uploadResults.dataAccessSentence as string | null | undefined) ?? null
}

const resolveSdgViewState = (uploadResults: SdgUploadResponse): SdgViewState => {
  if (!uploadResults.length) {
    return 'default'
  }

  if (uploadResults.some((result) => result.predictions)) {
    return 'success'
  }

  if (uploadResults.some((result) => result.predictions === null)) {
    return 'fail'
  }

  return 'default'
}

const SentencePdfUpload = ({
  data,
  loading,
  onResetResults,
  uploadPdf,
  uploadResults,
  variant,
}: SentencePdfUploadProps) => (
  <div className={styles.wrapper}>
    <CrPdfUpload
      acceptedFormats={ACCEPTED_FORMATS}
      foundSentence={resolveFoundSentence(uploadResults, variant)}
      licenseType={uploadResults.licenceRecognised}
      loading={loading}
      maxFileSize={MAX_FILE_SIZE_MB}
      onResetResults={onResetResults}
      onUpload={uploadPdf}
      texts={mapUploadTexts(data, variant)}
      title={data?.default?.title ?? 'Upload file'}
      uploadResults={uploadResults}
    />
  </div>
)

const SdgPdfUpload = ({
  data,
  loading,
  onResetResults,
  sdgTypes,
  uploadPdf,
  uploadResults,
}: SdgPdfUploadProps) => {
  const [validationView, setValidationView] = useState<'sizeIssue' | 'formatIssue' | null>(null)
  const [fileName, setFileName] = useState('')
  const texts = useMemo(() => mapUploadTexts(data, 'sdg'), [data])

  const resultView = useMemo((): SdgViewState | null => {
    if (loading) {
      return null
    }

    return resolveSdgViewState(uploadResults)
  }, [loading, uploadResults])

  const currentView: SdgViewState = validationView ?? resultView ?? 'default'

  const handleRetry = useCallback(() => {
    setValidationView(null)
    setFileName('')
    onResetResults()
  }, [onResetResults])

  const handleUpload = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setValidationView('sizeIssue')
        setFileName(file.name)
        return false
      }

      if (!ACCEPTED_FORMATS.includes(file.type)) {
        setValidationView('formatIssue')
        setFileName(file.name)
        return false
      }

      setValidationView(null)
      setFileName(file.name)

      try {
        await uploadPdf(file)
      } catch (error) {
        console.error('Upload failed:', error)
      }

      return false
    },
    [uploadPdf],
  )

  const uploadProps: UploadProps = useMemo(
    () => ({
      name: 'file',
      multiple: false,
      accept: ACCEPTED_FORMATS.join(','),
      beforeUpload: (file: RcFile) => {
        void handleUpload(file)
        return false
      },
      showUploadList: false,
      disabled: loading,
    }),
    [handleUpload, loading],
  )

  const commonProps = {
    acceptedFormats: ACCEPTED_FORMATS,
    fileName,
    loading,
    onRetry: handleRetry,
    onUpload: handleUpload,
    texts,
    uploadProps,
  }

  const renderContent = () => {
    switch (currentView) {
      case 'success':
        return (
          <SdgUploadSuccess
            data={data}
            fileName={fileName}
            loading={loading}
            sdgTypes={sdgTypes}
            uploadProps={uploadProps}
            uploadResults={uploadResults as SdgPrediction[]}
          />
        )
      case 'fail':
        return <FailUploadView {...commonProps} />
      case 'sizeIssue':
        return <SizeIssueView {...commonProps} maxFileSize={MAX_FILE_SIZE_MB} />
      case 'formatIssue':
        return <FormatIssueView {...commonProps} />
      default:
        return <DefaultUploadView {...commonProps} />
    }
  }

  return (
    <div className={styles.wrapper}>
      <Card className="pdf-upload-card">
        <div className="pdf-upload-header">
          <h1 className="pdf-upload-title">{data?.default?.title ?? 'Upload file'}</h1>
        </div>
        {renderContent()}
      </Card>
    </div>
  )
}

const PdfUpload = (props: PdfUploadProps) => {
  if (props.variant === 'sdg') {
    return <SdgPdfUpload {...props} />
  }

  return <SentencePdfUpload {...props} />
}

export default PdfUpload
