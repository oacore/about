import React from 'react'
import { Button } from '@oacore/design'
import { ProgressSpinner } from '@oacore/design/lib/elements'

import text from '../../data/retention.yml'
import styles from './styles.module.scss'

const SdgUploadSuccess = ({
  handleClick,
  handleFileChange,
  uploadRef,
  uploadResults,
  rrsPdfLoading,
  fileName,
  sdgTypes,
}) => (
  <div className={styles.uploadWrapper}>
    {!rrsPdfLoading ? (
      <>
        <div className={styles.successWrapper}>
          <div className={styles.titleWrapper}>
            <img src={text.upload.success.image} alt="issueSvg" />
            <h3 className={styles.uploadTitle}>
              {text.upload.sdgSuccess.title}
            </h3>
          </div>
        </div>
      </>
    ) : (
      <h3 className={styles.uploadTitle}>{text.upload.sdgDefault.title}</h3>
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
        <div className={styles.sdgWrapper}>
          {text.upload.sdgSuccess.description}
          <div className={styles.innerSdgWrapper}>
            {uploadResults.map((item) => {
              const sdgType = sdgTypes.find(
                (type) => type.id === item.predictions
              )
              return (
                <div className={styles.sdgItem} key={item.predictions}>
                  <div className={styles.imgWrapper}>
                    <img src={sdgType.icon} alt={sdgType.title} />
                  </div>
                  <div className={styles.scoreText}>
                    {item.confidence_score}
                  </div>
                  <div className={styles.subText}>(confidence)</div>
                </div>
              )
            })}
          </div>
        </div>
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

export default SdgUploadSuccess
