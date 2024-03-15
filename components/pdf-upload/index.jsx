import React, { useState, useRef, useEffect } from 'react'
import { router } from 'next/client'
import { Card } from '@oacore/design'

import DefaultUploadView from './defaultUpload'
import FormatUploadIssue from './formatUpload'
import SizeUploadIssue from './sizeUploadIssue'
import styles from './styles.module.scss'
import UploadSuccess from './uploadSuccess'
import UploadFail from './uploadFail'

const RrsCheckCard = ({ uploadPdf, uploadResults }) => {
  const uploadRef = useRef(null)
  const providerId = router.query['data-provider-id']

  const [currentView, setCurrentView] = useState('default')

  const handleClick = () => {
    uploadRef.current.click()
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
    const file = event.target.files[0]
    uploadPdf(file, providerId)
    if (file.size > 10 * 1024 * 1024) {
      setCurrentView('sizeIssue')
      return
    }
    if (file.type !== 'application/pdf') setCurrentView('formatIssue')
  }

  return (
    <Card className={styles.cardWrapperBig} tag="section" title="Your Title">
      <div className={styles.headerWrapper}>
        <Card.Title className={styles.cardTitle} tag="h2">
          Your Title
        </Card.Title>
      </div>
      {currentView === 'default' && (
        <DefaultUploadView
          uploadRef={uploadRef}
          handleFileChange={handleFileChange}
          handleClick={handleClick}
        />
      )}
      {currentView === 'sizeIssue' && (
        <SizeUploadIssue
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
        />
      )}
      {currentView === 'formatIssue' && (
        <FormatUploadIssue
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
        />
      )}
      {currentView === 'success' && (
        <UploadSuccess
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          uploadResults={uploadResults}
        />
      )}
      {currentView === 'fail' && (
        <UploadFail
          uploadRef={uploadRef}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
          uploadResults={uploadResults}
        />
      )}
    </Card>
  )
}
export default RrsCheckCard
