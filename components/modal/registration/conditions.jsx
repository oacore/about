import React, { useState } from 'react'
import { Modal, Button, Link } from '@oacore/design/lib'

import styles from './styles.module.scss'

import { Checkbox } from 'components/checkbox'
import { observe, useStore } from 'store'

const ModalConditions = observe(() => {
  const [isAgreeNewsletter, setIsAgreeNewsletter] = useState(false)
  const { registration } = useStore()

  const onSubmit = () => {
    registration.setData({ agreeNewsletter: isAgreeNewsletter })
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
        <Link href="/index">Terms and Conditions</Link> and
        <Link href="/privacy"> privacy notice</Link>. The T&Cs and privacy
        notice are designed to inform you of your rights and obligations when
        using the CORE service.
      </main>
      <Checkbox
        id="agreeNewsletter"
        labelText="I want to receive information about the CORE API and related CORE products and services. You may unsubscribe at any time."
        setCheckbox={setIsAgreeNewsletter}
      />
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
