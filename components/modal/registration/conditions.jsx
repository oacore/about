import React from 'react'
import { Modal, Button, Link } from '@oacore/design/lib'

import styles from './styles.module.scss'

import { observe, useStore } from 'store'

const ModalConditions = observe(() => {
  const { registration } = useStore()

  const onSubmit = () => {
    registration.registerSubmit()
    registration.setIsModalConditionsActive(false)
    registration.setIsModalSuccessActive(true)
  }

  const onCloseModal = () => {
    registration.setIsModalExitActive(true)
  }

  return (
    <Modal hideManually aria-label="conditions-modal">
      <h6>Do you agree with our Terms and Conditions?</h6>
      <main>
        Please, view our <Link href="/terms">Terms and Conditions</Link> and
        <Link href="/privacy"> Privacy notice</Link>. These documents are
        designed to inform you of your rights and obligations when using the
        CORE service.
      </main>
      <footer className={styles.buttonGroup}>
        <Button variant="text" onClick={onCloseModal}>
          Decline & Finish
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Accept & Continue
        </Button>
      </footer>
    </Modal>
  )
})

export default ModalConditions
