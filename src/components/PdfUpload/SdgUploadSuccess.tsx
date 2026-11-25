'use client'

import { Button, Spin, Upload } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd/es/upload'
import Image from 'next/image'

import type { SdgPrediction, SdgType, UploadSection } from '@components/PdfUpload/types'

import styles from './SdgUploadSuccess.module.css'

type SdgUploadSuccessProps = {
  data?: UploadSection
  fileName: string
  loading: boolean
  sdgTypes: SdgType[]
  uploadProps: UploadProps
  uploadResults: SdgPrediction[]
}

const SdgUploadSuccess = ({
  data,
  fileName,
  loading,
  sdgTypes,
  uploadProps,
  uploadResults,
}: SdgUploadSuccessProps) => (
  <div className={styles.uploadWrapper}>
    {!loading ? (
      <div className={styles.successWrapper}>
        <div className={styles.titleWrapper}>
          {data?.success?.image ? (
            <Image alt="" height={24} src={data.success.image} width={24} />
          ) : null}
          <h3 className={styles.uploadTitle}>{data?.success?.title}</h3>
        </div>
      </div>
    ) : (
      <h3 className={styles.uploadTitle}>{data?.default?.title}</h3>
    )}

    {loading ? (
      <div className={styles.innerWrapper}>
        <div className={styles.spinnerWrapper}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
        <h6 className={styles.fileName}>{fileName}</h6>
      </div>
    ) : (
      <div className={styles.innerIssueWrapper}>
        <div className={styles.sdgWrapper}>
          {data?.success?.description}
          <div className={styles.innerSdgWrapper}>
            {uploadResults.map((item) => {
              const sdgType = sdgTypes.find((type) => type.id === item.predictions)

              if (!sdgType) {
                return null
              }

              return (
                <div className={styles.sdgItem} key={item.predictions ?? 'unknown'}>
                  <div className={styles.sdgIconWrapper}>
                    <Image alt={sdgType.title} height={74} src={sdgType.icon} width={74} />
                  </div>
                  <div className={styles.scoreText}>{item.confidence_score}</div>
                  <div className={styles.subText}>(confidence)</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )}

    <div className={styles.uploadFooterButton}>
      <Upload {...uploadProps}>
        <Button disabled={loading} type="primary">
          {data?.success?.action?.title ?? 'Upload new file'}
        </Button>
      </Upload>
    </div>
  </div>
)

export default SdgUploadSuccess
