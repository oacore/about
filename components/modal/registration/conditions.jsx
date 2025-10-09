import React, { useState } from 'react'
import { Modal, Button } from '@oacore/design/lib'
import { useRouter } from 'next/router'

import text from '../../../data/registration.yml'
import styles from './styles.module.scss'
import Markdown from '../../markdown'

import { Checkbox } from 'components/checkbox'
import { observe, useStore } from 'store'

const ModalConditions = observe(() => {
  const [isAgreeNewsletter, setIsAgreeNewsletter] = useState(false)
  const { registration } = useStore()
  const router = useRouter()

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
      <Checkbox
        value
        isDisabled
        id="agreeNewsletter"
        labelText={<Markdown>{text.terms}</Markdown>}
        setCheckbox={setIsAgreeNewsletter}
      />
      <Checkbox
        value
        isDisabled
        id="agreeNewsletter"
        labelText={
          router.pathname.includes('api')
            ? ` I authorise CORE to send me information about the CORE API
              (required).`
            : ` I authorise CORE to send me information about the CORE Dataset (required).`
        }
        setCheckbox={setIsAgreeNewsletter}
      />
      <Checkbox
        id="agreeNewsletter"
        labelText={
          router.pathname.includes('api')
            ? ` I want to receive information about the CORE API and related CORE products and services. You may unsubscribe at any time.`
            : ` I want to receive information about the CORE Dataset and related CORE products and services. You may unsubscribe at any time.`
        }
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
