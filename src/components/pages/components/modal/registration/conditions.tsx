'use client'

import { Button, Checkbox } from 'antd'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import Markdown from '@components/Markdown/Markdown'
import Turnstile from '@components/turnstile'
import { useRegistrationStore } from '@stores/registration'

import ModalShell, { MODAL_WIDTH } from '@components/ModalShell'
import { useRegistrationAssets } from './registration-assets'
import styles from './styles.module.css'

const TURNSTILE_ACTION = 'register'

const ModalConditions = () => {
  const pathname = usePathname()
  const { copy, turnstileSiteKey } = useRegistrationAssets()
  const [isAgreeNewsletter, setIsAgreeNewsletter] = useState(false)
  const {
    data,
    isLoading,
    setData,
    registerSubmit,
    setIsModalConditionsActive,
    setIsModalExitActive,
  } = useRegistrationStore()
  const { turnstileToken } = data
  const isApi = pathname.includes('api')

  const handleNewsletterChange = (checked: boolean) => {
    setIsAgreeNewsletter(checked)
  }

  const handleSubmit = () => {
    if (!turnstileToken) {
      return
    }

    setData({ agreeNewsletter: isAgreeNewsletter })
    void registerSubmit()
    setIsModalConditionsActive(false)
  }

  const handleClose = () => {
    setIsModalConditionsActive(false)
    setIsModalExitActive(true)
  }

  return (
    <ModalShell
      ariaLabel="conditions-modal"
      onCancel={handleClose}
      title="Just one more thing!"
      width={MODAL_WIDTH.form}
    >
      <div className={styles.conditions}>
      <Checkbox checked disabled>
        <Markdown>{copy.terms}</Markdown>
      </Checkbox>
      <Checkbox checked disabled>
        {isApi
          ? 'I authorise CORE to send me information about the CORE API (required).'
          : 'I authorise CORE to send me information about the CORE Dataset (required).'}
      </Checkbox>
      <Checkbox checked={isAgreeNewsletter} onChange={(event) => handleNewsletterChange(event.target.checked)}>
        {isApi
          ? 'I wish to receive information about related CORE products and services. You may unsubscribe at any time.'
          : 'I want to receive information about the CORE Dataset and related CORE products and services. You may unsubscribe at any time.'}
      </Checkbox>
      <Turnstile
        action={TURNSTILE_ACTION}
        className={styles.turnstile}
        onError={() => setData({ turnstileToken: '' })}
        onExpire={() => setData({ turnstileToken: '' })}
        onSuccess={(token) => setData({ turnstileToken: token })}
        siteKey={turnstileSiteKey}
      />
      <footer className={styles.buttonGroup}>
        <Button onClick={handleClose} type="text">
          Decline & Finish
        </Button>
        <Button disabled={!turnstileToken} loading={isLoading} onClick={handleSubmit} type="primary">
          Accept & Continue
        </Button>
      </footer>
      </div>
    </ModalShell>
  )
}

export default ModalConditions
