import React from 'react'
import { Modal, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import emailsSVG from './images/Emails.svg'
import { patchStats } from '../../utils'
import Markdown from '../../markdown'
import findText from './helpers/findText'

const ModalSuccess = () => {
  const onCloseModal = () => {}

  return (
    <Modal hideManually aria-label="success-modal" className={styles.modalSm}>
      <h6>Success!</h6>
      <main className={styles.modalSmContent}>
        <div>
          <img src={emailsSVG} alt="emails" />
        </div>

        <Markdown>{patchStats(findText('modalContent'))}</Markdown>
      </main>
      <footer className={styles.buttonGroup}>
        <Button variant="text" onClick={onCloseModal}>
          close
        </Button>
      </footer>
    </Modal>
  )
}

export default ModalSuccess
