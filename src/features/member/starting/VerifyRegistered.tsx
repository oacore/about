'use client'

import { Button } from 'antd'
import { useState } from 'react'

import Markdown from '@components/Markdown/Markdown'
import type { MemberStartingStatus, SubmitStartingPayload } from '@features/member/types'
import { patchStats } from '@utils/patchStats'

import ConditionsModal from './ConditionsModal'

import styles from './starting.module.css'

type VerifyRegisteredProps = {
  item: MemberStartingStatus
  repoName: string
  emailAdministrator?: string
  onSubmitStarting: (payload: SubmitStartingPayload) => void
}

const VerifyRegistered = ({
  item,
  repoName,
  emailAdministrator,
  onSubmitStarting,
}: VerifyRegisteredProps) => {
  const [buttonText, setButtonText] = useState(item.button1.caption)
  const [isSent, setIsSent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = (evt: { preventDefault: () => void }) => {
    setIsModalOpen(false)
    setButtonText('Request sent')
    setIsSent(true)
    onSubmitStarting({ evt })
  }

  const handleModalUp = () => {
    setIsModalOpen(true)
  }

  const handleModalDown = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <ConditionsModal
        onCloseConditions={handleModalDown}
        onSubmitConditions={handleClick}
        open={isModalOpen}
        repoName={repoName}
      />
      {item.title ? <h4 className={styles.caption}>{item.title}</h4> : null}
      <div className={styles.innerWrapText}>
        <Markdown className={styles.text}>{item.text1}</Markdown>
        <Markdown className={styles.text}>
          {patchStats(item.text2, { emailAdministrator })}
        </Markdown>
        <Markdown className={styles.text}>{item.text3}</Markdown>
        <span className={styles.wrapBtn}>
          <Button
            className={isSent ? styles.btnSent : styles.btn}
            disabled={isSent}
            onClick={handleModalUp}
            type="primary"
          >
            {buttonText}
          </Button>
        </span>
        <span className={styles.wrapBtn}>
          <Button className={styles.btn} href={item.button2.url} type="default">
            {item.button2.caption}
          </Button>
        </span>
      </div>
    </div>
  )
}

export default VerifyRegistered
