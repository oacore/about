import React from 'react'
import { Modal } from '@oacore/design/lib'

import styles from './styles.module.scss'

const Video = ({ video, visibleModal, closeModal }) =>
  visibleModal && (
    <Modal
      onClose={closeModal}
      aria-label="Service video"
      className={styles.modal}
    >
      <iframe
        className={styles.video}
        src={video?.src}
        title={video?.title}
        allow="picture-in-picture"
        allowFullScreen
      />
    </Modal>
  )

export default Video
