import React from 'react'
import { Modal, Button, Link } from '@oacore/design/lib'

import styles from './styles.module.scss'

import { Checkbox } from 'components/checkbox'
import { observe, useStore } from 'store'

const ModalConditions = observe(() => {
  const { registration } = useStore()

  const onSubmit = () => {
    registration.registerSubmit()
    registration.setIsModalConditionsActive(false)
  }

  const onCloseModal = () => {
    registration.setIsModalConditionsActive(false)
    registration.setIsModalExitActive(true)
  }

  return (
    <Modal hideManually aria-label="conditions-modal">
      <h6>Just one more thing!</h6>
      <main>
        Please read and agree to the CORE
        <Link href="/terms">Terms and Conditions</Link> and
        <Link href="/privacy"> privacy notice</Link>. The T&Cs and privacy
        notice are designed to inform you of your rights and obligations when
        using the CORE service.
      </main>
      {Checkbox()}
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
