import React, { useMemo } from 'react'
import { Button, Modal } from '@oacore/design/lib'
import { classNames } from '@oacore/design/lib/utils'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'
import emailsSVG from './images/Emails.svg'
import { patchStats } from '../../utils'
import Markdown from '../../markdown'
import findText from './helpers/findText'

import { observe, useStore } from 'store'

const ModalSuccess = observe(({ responseData }) => {
  const { registration } = useStore()
  const router = useRouter()

  const onCloseModal = () => {
    registration.reset()
  }

  const contentToRender = useMemo(() => {
    const isDatasetPath = router.pathname.includes('dataset')
    const isSustainingMember = responseData?.memberStatus === 'sustaining'
    const isSupportingMember = responseData?.memberStatus === 'supporting'

    if (isDatasetPath) {
      if (isSustainingMember) return findText('modalContent')
      return findText('typeModalContent')
    }
    if (isSustainingMember || isSupportingMember)
      return findText('modalContent')
    return findText('typeModalContent')
  }, [])

  return (
    <Modal
      hideManually
      aria-label="success-modal"
      className={classNames.use(styles.modalSm, {
        [styles.modalBg]: registration.data.accountType === 'institution',
      })}
    >
      <h6>Success!</h6>
      <main className={styles.modalSmContent}>
        <div>
          <img src={emailsSVG} alt="emails" />
        </div>

        <Markdown>{patchStats(contentToRender, registration.data)}</Markdown>
      </main>
      <footer className={styles.buttonGroup}>
        <Button variant="text" onClick={onCloseModal}>
          close
        </Button>
      </footer>
    </Modal>
  )
})

export default ModalSuccess
