import React from 'react'
import { Modal, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import emailsSVG from './images/Emails.svg'

import { useStore } from 'store'

const ModalSuccess = () => {
  const { registration } = useStore()

  const onCloseModal = () => {
    registration.reset()
  }

  const textSelect = () => {
    switch (registration.data.accountType) {
      case 'personal' || 'researcher':
        return (
          <p>
            We have sent you access instructions to{' '}
            <span>{registration.data.email}</span>.
          </p>
        )

      case 'institution' || 'enterprise':
        return (
          <>
            <p>
              Thank you for registering. Our team will be in touch with further
              details as soon as possible.
            </p>
            <p>
              Any questions contact <span>theteam@core.ac.uk</span>
            </p>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Modal hideManually aria-label="success-modal" className={styles.modalSm}>
      <h6>Success!</h6>
      <main className={styles.modalSmContent}>
        <div>
          <img src={emailsSVG} alt="emails" />
        </div>
        {textSelect()}
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
