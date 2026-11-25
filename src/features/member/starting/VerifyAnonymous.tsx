'use client'

import { Button, Input } from 'antd'
import { useState, type ChangeEvent, type FormEvent } from 'react'

import Markdown from '@components/Markdown/Markdown'
import type { MemberStartingStatus, SubmitStartingPayload } from '@features/member/types'

import styles from './starting.module.css'

type VerifyAnonymousProps = {
  item: MemberStartingStatus
  onSubmitStarting: (payload: SubmitStartingPayload) => void
}

const VerifyAnonymous = ({ item, onSubmitStarting }: VerifyAnonymousProps) => {
  const [buttonText, setButtonText] = useState(item.button1.caption)
  const [isSent, setIsSent] = useState(false)
  const [justification, setJustification] = useState('')

  const fieldId = item.fields?.id ?? 'roleInOrganisation'

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJustification(event.target.value)
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setButtonText('Request sent')
    setIsSent(true)
    onSubmitStarting({ evt, roleInOrganisation: justification })
  }

  return (
    <form onSubmit={handleSubmit}>
      {item.title ? (
        <h4 className={styles.caption}>
          <Markdown>{item.title}</Markdown>
        </h4>
      ) : null}
      <div className={styles.innerWrapText}>
        <Markdown className={styles.text}>{item.text1}</Markdown>
        <Markdown className={styles.text}>{item.text2}</Markdown>
        {item.fields ? (
          <>
            <Input
              aria-label={item.fields.label}
              className={styles.textField}
              id={fieldId}
              name={fieldId}
              onChange={handleInputChange}
              placeholder={item.fields.placeholder}
              required
              size="large"
              value={justification}
            />
            {item.fields.appendTextBottom ? (
              <span className={styles.inputAppendBottom}>{item.fields.appendTextBottom}</span>
            ) : null}
          </>
        ) : null}
        <Markdown className={styles.text}>{item.text3}</Markdown>
        {item.text4 ? <Markdown className={styles.text}>{item.text4}</Markdown> : null}
        <Button
          className={isSent ? styles.btnSent : styles.btn}
          disabled={isSent}
          htmlType="submit"
          type="primary"
        >
          {buttonText}
        </Button>
        <Button className={styles.btn} href={item.button2.url} type="default">
          {item.button2.caption}
        </Button>
      </div>
    </form>
  )
}

export default VerifyAnonymous
