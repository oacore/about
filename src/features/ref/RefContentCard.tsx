'use client'

import { Card } from 'antd'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import type { RefSectionImage, RefSectionItem } from '@features/ref/types'

import styles from './ref.module.css'

const joinClasses = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(' ')

type RefContentCardProps = {
  /** Used for image alt text */
  title?: string
  content?: string
  content2?: string
  subContent?: string
  subContent2?: string
  subHeader?: string
  subHeaderContent?: string
  images?: RefSectionImage[]
  items?: RefSectionItem[]
  className?: string
}

/** REF guidance card: Markdown blocks, images and item lists (stacked in one column) */
const RefContentCard = ({
  title,
  content,
  content2,
  subContent,
  subContent2,
  subHeader,
  subHeaderContent,
  images,
  items,
  className,
}: RefContentCardProps) => (
  <Card className={joinClasses(styles.card, className)}>
    <div
      className={joinClasses(styles.cardWrapper, styles.cardWrapperColumn)}
    >
      <div
        className={joinClasses(styles.itemWrapper, styles.itemWrapperColumn)}
      >
        <div className={styles.subWrapper}>
          {subHeader ? (
            <div className={styles.cardSubHeader}>
              <Markdown className={styles.refText}>{subHeader}</Markdown>
            </div>
          ) : null}
          {subHeaderContent ? (
            <div className={styles.cardSubContent}>
              <Markdown className={styles.refText}>{subHeaderContent}</Markdown>
            </div>
          ) : null}
        </div>
        {content ? (
          <div className={styles.cardContent}>
            <Markdown className={styles.refText}>{content}</Markdown>
          </div>
        ) : null}
        {subContent ? (
          <div className={styles.cardSubContent}>
            <Markdown className={styles.refText}>{subContent}</Markdown>
          </div>
        ) : null}
        {subContent2 ? <span>And:</span> : null}
        {images?.length ? (
          <div className={styles.cardImages}>
            {images.map((image, index) => (
              <Image
                alt={`${title ?? 'Section'} image ${index + 1}`}
                className={styles.cardImage}
                height={120}
                key={`${image.item}-${index}`}
                src={image.item}
                width={320}
              />
            ))}
          </div>
        ) : null}
        {items?.length ? (
          <div className={styles.cardItems}>
            {items.map((item, index) => (
              <div className={styles.cardItem} key={`${item.title ?? 'item'}-${index}`}>
                {item.title ? (
                  <div className={styles.cardItemTitle}>
                    <Markdown className={styles.refText}>{item.title}</Markdown>
                  </div>
                ) : null}
                {item.description ? (
                  <div className={styles.cardItemDescription}>
                    <Markdown className={styles.refText}>{item.description}</Markdown>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
        {subContent2 ? (
          <div className={styles.cardSubContent}>
            <Markdown className={styles.refText}>{subContent2}</Markdown>
          </div>
        ) : null}
        {content2 ? (
          <div className={styles.cardContent}>
            <Markdown className={styles.refText}>{content2}</Markdown>
          </div>
        ) : null}
      </div>
    </div>
  </Card>
)

export default RefContentCard
