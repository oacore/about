import React from 'react'
import { Button } from '@oacore/design'

// import issueSvg from '../../public/images/logos/issue.svg'
import text from '../../data/retention.yml'
import styles from './styles.module.scss'

const FormatUploadIssue = ({ handleClick, handleFileChange, uploadRef }) => (
  <div className={styles.uploadWrapper}>
    <div className={styles.titleWrapper}>
      {/* <img src={issueSvg} alt="issueSvg" /> */}
      <h3 className={styles.uploadTitle}>{text.upload.noSupport.title}</h3>
    </div>
    <div className={styles.innerIssueWrapper}>
      <span className={styles.innerIssueTitle}>
        {text.upload.subInfo.format}
      </span>
      <input
        ref={uploadRef}
        type="file"
        id="fileInput"
        accept="application/pdf"
        onChange={handleFileChange}
        className={styles.display}
        hidden
      />
    </div>
    <div className={styles.uploadIssueFooter}>
      <Button onClick={handleClick} variant="contained">
        {text.upload.noSupport.action}
      </Button>
    </div>
  </div>
)

export default FormatUploadIssue
