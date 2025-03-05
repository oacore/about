import React from 'react'
import { Button } from '@oacore/design'
import { ProgressSpinner } from '@oacore/design/lib/elements'
import { useRouter } from 'next/router'

import text from '../../data/retention.yml'
import styles from './styles.module.scss'

const SizeUploadIssue = ({
  handleClick,
  handleFileChange,
  uploadRef,
  rrsPdfLoading,
  fileName,
}) => {
  const router = useRouter()
  const defaultText = router.pathname.includes('sdg')
    ? text.upload.sdgDefault
    : text.upload.default
  return (
    <div className={styles.uploadWrapper}>
      <div className={styles.titleWrapper}>
        {!rrsPdfLoading ? (
          <>
            <img src={text.upload.noSupport.image} alt="issueSvg" />
            <h3 className={styles.uploadTitle}>
              {text.upload.noSupport.sizeTitle}
            </h3>
          </>
        ) : (
          <h3 className={styles.uploadTitle}>{defaultText.title}</h3>
        )}
      </div>
      {rrsPdfLoading ? (
        <div className={styles.innerWrapper}>
          <div className={styles.spinnerWrapper}>
            <ProgressSpinner className={styles.spinner} />
          </div>
          <h6 className={styles.fileName}>{fileName}</h6>
        </div>
      ) : (
        <div className={styles.innerIssueWrapper}>
          <span className={styles.innerIssueTitle}>
            {text.upload.subInfo.size}
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
      <div className={styles.uploadIssueFooter}>
        <Button
          disabled={rrsPdfLoading}
          onClick={handleClick}
          variant="contained"
        >
          {text.upload.noSupport.action}
        </Button>
      </div>
    </div>
  )
}

export default SizeUploadIssue
