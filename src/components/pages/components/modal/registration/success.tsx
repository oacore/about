'use client'

import { MODAL_WIDTH, ModalShell } from '@core/core-ui'
import { Button } from 'antd'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import Markdown from '@components/Markdown/Markdown'
import { getSectionText } from '@features/registration/content'
import { patchStats } from '@utils/patchStats'
import { useRegistrationStore } from '@stores/registration'

import emailsSvg from './images/Emails.svg'
import { useRegistrationAssets } from './registration-assets'
import styles from './styles.module.css'

const ModalSuccess = () => {
  const pathname = usePathname()
  const { copy } = useRegistrationAssets()
  const { data, responseData, reset } = useRegistrationStore()
  const { accountType, productType, email } = data

  const contentToRender = useMemo(() => {
    const isDatasetPath = pathname.includes('dataset')
    const isSustainingMember = responseData?.memberStatus === 'sustaining'
    const isSupportingMember = responseData?.memberStatus === 'supporting'

    if (isDatasetPath) {
      if (isSustainingMember) {
        return getSectionText(copy, productType, accountType, 'modalContent')
      }

      return getSectionText(copy, productType, accountType, 'typeModalContent')
    }

    if (isSustainingMember || isSupportingMember) {
      return getSectionText(copy, productType, accountType, 'modalContent')
    }

    return getSectionText(copy, productType, accountType, 'typeModalContent')
  }, [accountType, copy, pathname, productType, responseData?.memberStatus])

  return (
    <ModalShell
      ariaLabel="success-modal"
      onCancel={reset}
      title="Success!"
      width={accountType === 'institution' ? MODAL_WIDTH.medium : MODAL_WIDTH.small}
    >
      <main className={styles.modalSmContent}>
        <Image alt="emails" height={120} src={emailsSvg} unoptimized width={160} />
        <Markdown>{patchStats(contentToRender, { email })}</Markdown>
      </main>
      <footer className={styles.buttonGroup}>
        <Button onClick={reset} type="text">
          close
        </Button>
      </footer>
    </ModalShell>
  )
}

export default ModalSuccess
