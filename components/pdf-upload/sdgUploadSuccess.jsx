import React from 'react'
import { Button } from '@oacore/design'
import { ProgressSpinner } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'

const SdgUploadSuccess = ({
  handleClick,
  handleFileChange,
  uploadRef,
  uploadResults,
  rrsPdfLoading,
  fileName,
  sdgTypes,
  data,
}) => (
  <div className={styles.uploadWrapper}>
    {!rrsPdfLoading ? (
      <>
        <div className={styles.successWrapper}>
          <div className={styles.titleWrapper}>
            <img src={data.success.image} alt="issueSvg" />
            <h3 className={styles.uploadTitle}>{data.success.title}</h3>
          </div>
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
        <div className={styles.sdgWrapper}>
          {data.success.description}
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

export default SdgUploadSuccess
