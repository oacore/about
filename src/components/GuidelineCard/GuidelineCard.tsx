'use client'

import { Button } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'

import styles from './GuidelineCard.module.css'

export type GuidelineCardAction = {
  title?: string
  url?: string
}

export type GuidelineCardData = {
  title?: string
  picture?: string
  description?: string
  action?: GuidelineCardAction
}

export type GuidelineCardProps = GuidelineCardData & {
  /** `primary` = solid button (/data), `default` = outlined button (/faq, /benefits) */
  buttonType?: 'primary' | 'default'
  className?: string
}

const resolveActionHref = (url: string): string => {
  if (/^(https?:|mailto:|#|\/)/.test(url)) {
    return url
  }

  return `/${url}`
}

const GuidelineCard = ({
  title,
  picture,
  description,
  action,
  buttonType = 'default',
  className,
}: GuidelineCardProps) => {
  const href = action?.url ? resolveActionHref(action.url) : undefined
  const isExternal = href?.startsWith('http')

  return (
    <div className={classNames(styles.guideline, className)}>
      <div className={styles.card}>
        <div className={styles.header}>
          {picture ? (
            <Image
              alt=""
              className={styles.picture}
              height={46}
              src={picture}
              unoptimized
              width={70}
            />
          ) : null}
          {title ? <span className={styles.title}>{title}</span> : null}
        </div>
        {description ? <Markdown className={styles.description}>{description}</Markdown> : null}
        {href ? (
          <div className={styles.actions}>
            <Button
              className={styles.actionButton}
              href={href}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              target={isExternal ? '_blank' : undefined}
              type={buttonType}
            >
              {action?.title}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default GuidelineCard
