'use client'

import { MODAL_WIDTH, ModalShell } from '@core/core-ui'
import { Button } from 'antd'
import Image from 'next/image'

import { useRegistrationStore } from '@stores/registration'

import errorSvg from './images/Error.svg'
import styles from './styles.module.css'

const ModalError = () => {
  const { reset } = useRegistrationStore()

  return (
    <ModalShell
      ariaLabel="error-modal"
      onCancel={reset}
      title="Error"
      width={MODAL_WIDTH.small}
    >
      <main className={styles.modalSmContent}>
        <Image alt="error" height={120} src={errorSvg} unoptimized width={160} />
        <p>We could not process your request. Please try again later.</p>
      </main>
      <footer className={styles.buttonGroup}>
        <Button onClick={reset} type="text">
          close
        </Button>
      </footer>
    </ModalShell>
  )
}

export default ModalError
