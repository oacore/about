import React from 'react'
import { Modal, Link, Button } from '@oacore/design/lib'

import styles from './styles.module.scss'
import leaveSVG from './images/Alone.svg'

import { useStore, observe } from 'store'

const ModalExit = observe(() => {
  const { registration } = useStore()

  const onCloseModal = () => {
    registration.reset()
  }

  return (
    <Modal hideManually aria-label="exit-modal" className={styles.modalSm}>
      <h6>It is sad to see you go</h6>
      <main className={styles.modalSmContent}>
        <div>
          <img src={leaveSVG} alt="leave" />
        </div>
        <p>
          Don not hesitate to <Link href="/contact">contact us</Link> if you
          have any questions.
        </p>
      </main>
      <footer className={styles.buttonGroup}>
        <Button variant="text" onClick={onCloseModal}>
          close
        </Button>
      </footer>
    </Modal>
  )
})

export default ModalExit
