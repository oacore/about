import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

import DefaultUploadView from './defaultUpload'
import FormatUploadIssue from './formatUpload'
import SizeUploadIssue from './sizeUploadIssue'
import styles from './styles.module.scss'
import UploadSuccess from './uploadSuccess'
import UploadFail from './uploadFail'
import SdgUploadSuccess from './sdgUploadSuccess'

const FileUpload = ({
  uploadPdf,
  uploadResults,
  rrsPdfLoading,
  sdgTypes,
  data,
}) => {
  const uploadRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [currentView, setCurrentView] = useState('default')
  const router = useRouter()

  const handleClick = () => {
    if (!rrsPdfLoading && uploadRef.current) uploadRef.current.click()
  }

  useEffect(() => {
    if (!uploadResults) return

    const results = Array.isArray(uploadResults) ? uploadResults : []
    if (results.some((result) => result.predictions)) setCurrentView('success')
    else if (
      uploadResults.rightsRetentionSentence ||
      (uploadResults.dataAccessSentence && uploadResults.confidence !== 0)
    )
      setCurrentView('success')
    else if (
      !uploadResults.rightsRetentionSentence &&
      uploadResults.confidence === 0
    )
      setCurrentView('fail')
    else if (results.some((result) => result.predictions === null))
      setCurrentView('fail')
  }, [uploadResults])

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleFileChange = (event) => {
    event.preventDefault()
    if (rrsPdfLoading) return

    const { files } = event.dataTransfer || event.target

    if (files && files.length) {
      const file = files[0]
      if (file.size > 10 * 1024 * 1024) {
        setCurrentView('sizeIssue')
        return
      }
      const fileType = file.type
      if (fileType !== 'application/pdf') {
        setCurrentView('formatIssue')
        return
      }
      setFileName(file.name)
      uploadPdf(file)
    }
    event.stopPropagation()
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleFileChange}
      className={styles.cardWrapperBig}
    >
      {currentView === 'default' && (
        <DefaultUploadView
          uploadRef={uploadRef}
          handleFileChange={handleFileChange}
          handleClick={handleClick}
          rrsPdfLoading={rrsPdfLoading}
          fileName={fileName}
          data={data}
        />
      )}
      {currentView === 'sizeIssue' && (
        <SizeUploadIssue
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          rrsPdfLoading={rrsPdfLoading}
          fileName={fileName}
          data={data}
        />
      )}
      {currentView === 'formatIssue' && (
        <FormatUploadIssue
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          rrsPdfLoading={rrsPdfLoading}
          fileName={fileName}
          data={data}
        />
      )}
      {currentView === 'success' && (
        <>
          {router.pathname.includes('sdg') ? (
            <SdgUploadSuccess
              uploadRef={uploadRef}
              handleClick={handleClick}
              handleFileChange={handleFileChange}
              uploadResults={uploadResults}
              rrsPdfLoading={rrsPdfLoading}
              fileName={fileName}
              sdgTypes={sdgTypes}
              data={data}
            />
          ) : (
            <UploadSuccess
              uploadRef={uploadRef}
              handleClick={handleClick}
              handleFileChange={handleFileChange}
              uploadResults={uploadResults}
              rrsPdfLoading={rrsPdfLoading}
              fileName={fileName}
              data={data}
            />
          )}
        </>
      )}
      {currentView === 'fail' && (
        <UploadFail
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          rrsPdfLoading={rrsPdfLoading}
          fileName={fileName}
          data={data}
        />
      )}
    </div>
  )
}
export default FileUpload
