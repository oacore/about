import React, { useState } from 'react'
import { Modal, Button } from '@oacore/design/lib'

import text from '../../../data/registration.yml'
import styles from './styles.module.scss'
import Markdown from '../../markdown'

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
      <Markdown>{text.terms}</Markdown>
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
