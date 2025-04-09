import React from 'react'
import { Button } from '@oacore/design'
import { ProgressSpinner } from '@oacore/design/lib/elements'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'

const UploadSuccess = ({
  handleClick,
  handleFileChange,
  uploadRef,
  uploadResults,
  rrsPdfLoading,
  fileName,
  data,
}) => {
  const router = useRouter()

  return (
    <div className={styles.uploadWrapper}>
      {!rrsPdfLoading ? (
        <>
          <div className={styles.successWrapper}>
            <div className={styles.titleWrapper}>
              <img src={data.success.image} alt="issueSvg" />
              <h3 className={styles.uploadTitle}>{data.success.title}</h3>
            </div>
            {uploadResults.licenceRecognised && (
              <div className={styles.statusType}>
                {uploadResults.licenceRecognised}
              </div>
            )}
          </div>
        </>
      ) : (
        <h3 className={styles.uploadTitle}>{data.default.title}</h3>
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
            {router.pathname.includes('rights-retention')
              ? uploadResults.rightsRetentionSentence
              : uploadResults.dataAccessSentence}
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
          {data.success.action.title}
        </Button>
      </div>
    </div>
  )
}

export default UploadSuccess
