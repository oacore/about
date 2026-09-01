import React, { useState } from 'react'
import { Modal, Button } from '@oacore/design/lib'
import { useRouter } from 'next/router'

import text from '../../../data/registration.yml'
import styles from './styles.module.scss'
import Markdown from '../../markdown'

import { Checkbox } from 'components/checkbox'
import Turnstile from 'components/turnstile'
import { observe, useStore } from 'store'

const TURNSTILE_ACTION = 'register'

const ModalConditions = observe(() => {
  const [isAgreeNewsletter, setIsAgreeNewsletter] = useState(false)
  const { registration } = useStore()
  const router = useRouter()
  const hasTurnstileToken = Boolean(registration.data.turnstileToken)

  const onSubmit = () => {
    if (!registration.data.turnstileToken) return
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
            ? ` I wish to receive information about related CORE products and services. You may unsubscribe at any time.`
            : ` I want to receive information about the CORE Dataset and related CORE products and services. You may unsubscribe at any time.`
        }
        setCheckbox={setIsAgreeNewsletter}
      />
      <Turnstile
        className={styles.turnstile}
        action={TURNSTILE_ACTION}
        onSuccess={(token) => registration.setData({ turnstileToken: token })}
        onExpire={() => registration.setData({ turnstileToken: '' })}
        onError={() => registration.setData({ turnstileToken: '' })}
      />
      <footer className={styles.buttonGroup}>
        <Button variant="text" onClick={onCloseModal}>
          Decline & Finish
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!hasTurnstileToken}
        >
          Accept & Continue
        </Button>
      </footer>
    </Modal>
  )
})

export default ModalConditions
