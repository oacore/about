'use client'

import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

import { useRegistrationStore } from '@stores/registration'

import leaveSvg from './images/Alone.svg'
import ModalShell, { MODAL_WIDTH } from '@components/ModalShell'
import styles from './styles.module.css'

const ModalExit = () => {
  const { reset } = useRegistrationStore()

  return (
    <ModalShell
      ariaLabel="exit-modal"
      onCancel={reset}
      title="It is sad to see you go"
      width={MODAL_WIDTH.small}
    >
      <main className={styles.modalSmContent}>
        <Image alt="leave" height={120} src={leaveSvg} unoptimized width={160} />
        <p>
          Do not hesitate to <Link href="/about#contact">contact us</Link> if you have any questions.
        </p>
      </main>
      <footer className={styles.buttonGroup}>
        <Button onClick={reset} type="text">
          close
        </Button>
      </footer>
    </ModalShell>
  )
}

export default ModalExit
