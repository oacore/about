import React from 'react'
import { Button } from '@oacore/design'
import { ProgressSpinner } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'

const UploadFail = ({
  handleClick,
  handleFileChange,
  uploadRef,
  rrsPdfLoading,
  fileName,
  data,
}) => (
  <div className={styles.uploadWrapper}>
    <div className={styles.successWrapper}>
      <div className={styles.titleWrapper}>
        {!rrsPdfLoading ? (
          <>
            <img src={data.fail.image} alt="issueSvg" />
            <h3 className={styles.uploadTitle}>{data.fail.title}</h3>
          </>
        ) : (
          <h3 className={styles.uploadTitle}>{data.default.title}</h3>
        )}
      </div>
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
        <span className={styles.innerIssueTitle}>{data.fail.description}</span>
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
        {data.fail.action.title}
      </Button>
    </div>
  </div>
)

export default UploadFail
