import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

import DefaultUploadView from './defaultUpload'
import FormatUploadIssue from './formatUpload'
import SizeUploadIssue from './sizeUploadIssue'
import styles from './styles.module.scss'
import UploadSuccess from './uploadSuccess'
import UploadFail from './uploadFail'
import SdgUploadSuccess from './sdgUploadSuccess'

const RrsCheckCard = ({
  uploadPdf,
  uploadResults,
  rrsPdfLoading,
  sdgTypes,
}) => {
  const uploadRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [currentView, setCurrentView] = useState('default')
  const router = useRouter()

  const handleClick = () => {
    if (!rrsPdfLoading) uploadRef.current.click()
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    const results = Array.isArray(uploadResults) ? uploadResults : []
    if (results.some((result) => result.predictions)) setCurrentView('success')
    if (uploadResults.rightsRetentionSentence) setCurrentView('success')
    if (
      !uploadResults.rightsRetentionSentence &&
      uploadResults.confidence === 0
    )
      setCurrentView('fail')
    if (results.some((result) => result.predictions === null))
      setCurrentView('fail')
  }, [uploadResults])

  const handleFileChange = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (rrsPdfLoading) return

    let file
    const { files } = event.dataTransfer || event.target

    if (files && files.length) {
      // eslint-disable-next-line prefer-destructuring
      file = files[0]
      if (file.size > 10 * 1024 * 1024) {
        setCurrentView('sizeIssue')
        return
      }
      const fileType = file.type
      if (fileType !== 'application/pdf') {
        setCurrentView('formatIssue')
        return
      }
      uploadPdf(file)
      setFileName(file.name)
    }
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
        />
      )}
      {currentView === 'sizeIssue' && (
        <SizeUploadIssue
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          rrsPdfLoading={rrsPdfLoading}
          fileName={fileName}
        />
      )}
      {currentView === 'formatIssue' && (
        <FormatUploadIssue
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          rrsPdfLoading={rrsPdfLoading}
          fileName={fileName}
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
            />
          ) : (
            <UploadSuccess
              uploadRef={uploadRef}
              handleClick={handleClick}
              handleFileChange={handleFileChange}
              uploadResults={uploadResults}
              rrsPdfLoading={rrsPdfLoading}
              fileName={fileName}
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
        />
      )}
    </div>
  )
}
export default RrsCheckCard
