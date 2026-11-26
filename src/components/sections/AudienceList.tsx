'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import styles from './testimonial.module.css'

const quoteLimit = 105

export type AudienceItem = {
  title: string
  description: string
  logo: string
  content: string
  author: string
  extraText?: string
}

type AudienceListProps = {
  items: AudienceItem[]
  className?: string
}

type AudienceQuoteProps = {
  text: string
}

const AudienceQuote = ({ text }: AudienceQuoteProps) => {
  const quote = text.trim()
  const isLong = quote.length > quoteLimit
  const [isCollapsed, setIsCollapsed] = useState(isLong)
  const visibleText = isCollapsed ? `${quote.slice(0, quoteLimit)}...` : quote

  const handleToggle = () => {
    setIsCollapsed((current) => !current)
  }

  return (
    <p className={styles.citation}>
      “{visibleText}”
      {isLong ? (
        <button
          aria-expanded={!isCollapsed}
          className={styles.readMore}
          onClick={handleToggle}
          type="button"
        >
          {isCollapsed ? ' Show more' : ' Show less'}
        </button>
      ) : null}
    </p>
  )
}

const AudienceList = ({ items, className }: AudienceListProps) => (
  <ul className={classNames(styles.list, className)}>
    {items.map((item) => (
      <li className={styles.item} key={item.title}>
        <div className={styles.header}>
          <h5 className={styles.title}>{item.title}</h5>
          <p className={styles.description}>{item.description}</p>
        </div>
        <div className={styles.content}>
          <Image
            alt={item.title}
            className={styles.logo}
            height={64}
            src={item.logo}
            unoptimized
            width={180}
          />
          <div className={styles.divider} />
          <AudienceQuote text={item.content} />
          <h6 className={styles.author}>{item.author}</h6>
          {item.extraText ? <span className={styles.extra}>{item.extraText}</span> : null}
        </div>
      </li>
    ))}
  </ul>
)

export default AudienceList
