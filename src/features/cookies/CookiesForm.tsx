'use client'

import type { CookieItem } from '@core/core-ui'
import { Button, Switch } from 'antd'
import { useState, type MouseEvent } from 'react'

import Markdown from '@components/Markdown/Markdown'
import getKeyByValue from '@/helpers/getKeyByValue'

import styles from './cookies.module.css'

type CookiesFormProps = {
  title?: string
  items: CookieItem[]
  id?: string
  itemDescriptionTitle?: string
  submitCaption?: string
  onSubmit: (event: MouseEvent<HTMLButtonElement>) => void
}

const CookiesForm = ({
  title,
  items,
  id = 'cookies-form',
  itemDescriptionTitle = 'What are these?',
  submitCaption = 'Apply',
  onSubmit,
}: CookiesFormProps) => {
  const [checkBoxes, setCheckBoxes] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map(({ name, value, required }) => [name, required || value])),
  )

  const handleToggleCookie = (cookieName: string) => (checked: boolean) => {
    setCheckBoxes((current) => ({
      ...current,
      [cookieName]: checked,
    }))
  }

  return (
    <div className={styles.cookiesForm}>
      {title ? <h4 className={styles.formTitle}>{title}</h4> : null}
      {items.map(({ id: cookieId, name, title: label, description, required }) => (
        <div className={styles.option} key={name}>
          <div className={`${styles.switchRow} ${required ? styles.switchRowDisabled : ''}`}>
            <Switch
              aria-labelledby={`${id}-${cookieId}-label`}
              checked={Boolean(checkBoxes[name])}
              disabled={required}
              id={`${id}-${cookieId}`}
              onChange={handleToggleCookie(name)}
            />
            <span className={styles.switchLabel} id={`${id}-${cookieId}-label`}>
              {label}
            </span>
          </div>
          <details className={styles.cookiesFormDetails}>
            <summary>{itemDescriptionTitle}</summary>
            <Markdown>{description}</Markdown>
          </details>
        </div>
      ))}
      <div className={styles.actions}>
        <Button id={getKeyByValue(checkBoxes, true).join(',')} onClick={onSubmit} type="primary">
          {submitCaption}
        </Button>
      </div>
    </div>
  )
}

export default CookiesForm
