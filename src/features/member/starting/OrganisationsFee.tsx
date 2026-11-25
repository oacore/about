'use client'

import { Button } from 'antd'
import { useState } from 'react'

import Markdown from '@components/Markdown/Markdown'
import type { MemberStartingStatus, SubmitStartingPayload } from '@features/member/types'
import { patchStats } from '@utils/patchStats'

import styles from './starting.module.css'

type OrganisationsFeeProps = {
  item: MemberStartingStatus
  emailAdministrator?: string
  onSubmitStarting: (payload: SubmitStartingPayload) => void
}

const OrganisationsFee = ({ item, emailAdministrator, onSubmitStarting }: OrganisationsFeeProps) => {
  const [isSent, setIsSent] = useState(false)

  // The store is reset after a successful send, so a second click would post empty data.
  const handleClick = (evt: { preventDefault: () => void }) => {
    if (isSent) {
      return
    }

    setIsSent(true)
    onSubmitStarting({ evt })
  }

  return (
    <div>
      {item.title ? <h4 className={styles.caption}>{item.title}</h4> : null}
      <div className={styles.innerWrapText}>
        <Markdown className={styles.text}>{item.text1}</Markdown>
        <Markdown className={styles.text}>{patchStats(item.text2, { emailAdministrator })}</Markdown>
        <Markdown className={styles.text}>{item.text3}</Markdown>
        <span className={styles.wrapBtn}>
          <Button
            className={isSent ? styles.btnSent : styles.btn}
            disabled={isSent}
            onClick={handleClick}
            type="primary"
          >
            {isSent ? 'Request sent' : item.button1.caption}
          </Button>
        </span>
        {item.text4 ? <Markdown className={styles.text}>{item.text4}</Markdown> : null}
        <span className={styles.wrapBtn}>
          <Button className={styles.btn} href={item.button2.url} type="default">
            {item.button2.caption}
          </Button>
        </span>
      </div>
    </div>
  )
}

export default OrganisationsFee
