import React from 'react'
import { Button } from '@oacore/design'

import text from '../../data/retention.yml'
import styles from './styles.module.scss'

const UploadFail = ({ handleClick, handleFileChange, uploadRef }) => (
  <div className={styles.uploadWrapper}>
    <div className={styles.successWrapper}>
      <div className={styles.titleWrapper}>
        {/* <img src={fail} alt="issueSvg" /> */}
        <h3 className={styles.uploadTitle}>{text.upload.fail.title}</h3>
      </div>
    </div>
    <div className={styles.innerIssueWrapper}>
      <span className={styles.uploadTitle}>{text.upload.fail.description}</span>
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
    <div className={styles.uploadFooterButton}>
      <Button onClick={handleClick} variant="contained">
        {text.upload.fail.action.title}
      </Button>
    </div>
  </div>
)

export default UploadFail
