import React from 'react'
import { Modal, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import errorSvg from './images/Error.svg'

const ModalError = () => {
  const onCloseModal = () => {}

  return (
    <Modal hideManually aria-label="error-modal" className={styles.modalSm}>
      <h6>Error</h6>
      <main className={styles.modalSmContent}>
        <div>
          <img src={errorSvg} alt="leave" />
        </div>
        <p>We could not process your request. Please try again later.</p>
      </main>
      <footer className={styles.buttonGroup}>
        <Button variant="text" onClick={onCloseModal}>
          close
        </Button>
      </footer>
    </Modal>
  )
}

export default ModalError
