import React from 'react'
import { Modal, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import emailsSVG from './images/Emails.svg'
import { patchStats } from '../../utils'
import Markdown from '../../markdown'
import findText from './helpers/findText'

import { useStore, observe } from 'store'

const ModalSuccess = observe(({ responseData }) => {
  const { registration } = useStore()

  const onCloseModal = () => {
    registration.reset()
  }

  return (
    <Modal hideManually aria-label="success-modal" className={styles.modalSm}>
      <h6>Success!</h6>
      <main className={styles.modalSmContent}>
        <div>
          <img src={emailsSVG} alt="emails" />
        </div>

        <Markdown>
          {responseData?.memberStatus !== 'starting'
            ? patchStats(findText('modalContent'), registration.data)
            : patchStats(findText('typeModalContent'), registration.data)}
        </Markdown>
      </main>
      <footer className={styles.buttonGroup}>
        <Button variant="text" onClick={onCloseModal}>
          close
        </Button>
      </footer>
    </Modal>
  )
})

export default ModalSuccess
