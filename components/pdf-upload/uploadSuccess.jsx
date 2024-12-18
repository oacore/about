import React from 'react'
import { Button } from '@oacore/design'
import { ProgressSpinner } from '@oacore/design/lib/elements'

import text from '../../data/retention.yml'
import styles from './styles.module.scss'

const UploadSuccess = ({
  handleClick,
  handleFileChange,
  uploadRef,
  uploadResults,
  rrsPdfLoading,
  fileName,
}) => (
  <div className={styles.uploadWrapper}>
    {!rrsPdfLoading ? (
      <>
        <div className={styles.successWrapper}>
          <div className={styles.titleWrapper}>
            <img src={text.upload.success.image} alt="issueSvg" />
            <h3 className={styles.uploadTitle}>{text.upload.success.title}</h3>
          </div>
          <div className={styles.statusType}>
            {uploadResults.licenceRecognised}
          </div>
        </div>
      </>
    ) : (
      <h3 className={styles.uploadTitle}>{text.upload.default.title}</h3>
    )}
    {rrsPdfLoading ? (
      <div className={styles.innerWrapper}>
        <div className={styles.spinnerWrapper}>
          <ProgressSpinner className={styles.spinner} />
        </div>
        <h6 className={styles.fileName}>{fileName}</h6>
      </div>
    ) : (
      <div className={styles.innerIssueWrapper}>
        <span className={styles.uploadDescription}>
          {uploadResults.rightsRetentionSentence}
        </span>
        <input
          ref={uploadRef}
          type="file"
          id="fileInput"
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className={styles.display}
          hidden
        />
      </div>
    )}
    <div className={styles.uploadFooterButton}>
      <Button
        disabled={rrsPdfLoading}
        onClick={handleClick}
        variant="contained"
      >
        {text.upload.success.action.title}
      </Button>
    </div>
  </div>
)

export default UploadSuccess
