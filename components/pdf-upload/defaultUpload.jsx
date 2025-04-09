import React from 'react'
import { Button } from '@oacore/design'
import { ProgressSpinner } from '@oacore/design/lib/elements'

import uploadSvg from '../../public/images/logos/upload.svg'
import styles from './styles.module.scss'

const DefaultUploadView = ({
  handleClick,
  uploadRef,
  handleFileChange,
  rrsPdfLoading,
  fileName,
  data,
}) => (
  <div className={styles.uploadWrapper}>
    <h3 className={styles.uploadTitle}>{data.default.title}</h3>
    {rrsPdfLoading ? (
      <div className={styles.innerWrapper}>
        <div className={styles.spinnerWrapper}>
          <ProgressSpinner className={styles.spinner} />
        </div>
        <h6 className={styles.fileName}>{fileName}</h6>
      </div>
    ) : (
      /* eslint-disable-next-line max-len */
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
      <div className={styles.innerWrapper} onClick={handleClick}>
        <img
          src={uploadSvg}
          alt="Upload Icon"
          style={{ width: '50px', height: '50px', marginBottom: '10px' }}
        />
        <p className={styles.innerTitle}>{data.default.subTitle}</p>
        <input
          ref={uploadRef}
          type="file"
          id="fileInput"
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className={styles.display}
          hidden
        />
        <p className={styles.connector}>- OR -</p>
        <Button
          disabled={rrsPdfLoading}
          onClick={handleClick}
          variant="contained"
        >
          {data.default.action.title}
        </Button>
      </div>
    )}
    <div className={styles.uploadFooter}>
      <span className={styles.footerText}>{data.subInfo.format}</span>
      <span className={styles.footerText}>{data.subInfo.size}</span>
    </div>
  </div>
)

export default DefaultUploadView
