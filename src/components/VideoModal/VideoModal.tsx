'use client'

import { Modal } from 'antd'

import styles from './VideoModal.module.css'

export type VideoModalVideo = {
  src: string
  title: string
}

type VideoModalProps = {
  video: VideoModalVideo | null | false | undefined
  onClose: () => void
}

const VideoModal = ({ video, onClose }: VideoModalProps) => (
  <Modal
    aria-label="Service video"
    centered
    className={styles.videoModal}
    classNames={{ body: styles.videoModalBody, content: styles.videoModalContent }}
    destroyOnHidden
    footer={null}
    onCancel={onClose}
    open={Boolean(video)}
    width="70vw"
  >
    {video ? (
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={styles.videoModalIframe}
        src={video.src}
        title={video.title}
      />
    ) : null}
  </Modal>
)

export default VideoModal
