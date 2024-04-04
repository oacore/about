import React, { useState, useRef, useEffect } from 'react'

import DefaultUploadView from './defaultUpload'
import FormatUploadIssue from './formatUpload'
import SizeUploadIssue from './sizeUploadIssue'
import styles from './styles.module.scss'
import UploadSuccess from './uploadSuccess'
import UploadFail from './uploadFail'

const RrsCheckCard = ({ uploadPdf, uploadResults, rrsPdfLoading }) => {
  const uploadRef = useRef(null)
  const [fileName, setFileName] = useState('')

  const [currentView, setCurrentView] = useState('default')

  const handleClick = () => {
    uploadRef.current.click()
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (uploadResults.rightsRetentionSentence) setCurrentView('success')
    if (
      !uploadResults.rightsRetentionSentence &&
      uploadResults.confidence === 0
    )
      setCurrentView('fail')
  }, [uploadResults])

  const handleFileChange = (event) => {
    event.preventDefault()
    if (rrsPdfLoading) return

    let file
    const { files } = event.dataTransfer || event.target

    if (files && files.length) {
      // eslint-disable-next-line prefer-destructuring
      file = files[0]
      uploadPdf(file, 1)
      setFileName(file.name)
      if (file.size > 10 * 1024 * 1024) {
        setCurrentView('sizeIssue')
        return
      }
      const fileType = file.type
      if (
        !(
          fileType === 'application/pdf' ||
          fileType === 'application/msword' ||
          fileType ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
      ) {
        setCurrentView('formatIssue')
        return
      }
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
        <UploadSuccess
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          uploadResults={uploadResults}
          rrsPdfLoading={rrsPdfLoading}
          fileName={fileName}
        />
      )}
      {currentView === 'fail' && (
        <UploadFail
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          uploadResults={uploadResults}
          rrsPdfLoading={rrsPdfLoading}
          fileName={fileName}
        />
      )}
    </div>
  )
}
export default RrsCheckCard
