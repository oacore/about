'use client'

import { ExportOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import type { HistoryMilestone as HistoryMilestoneData } from '@features/history/types'

import styles from './styles.module.css'

type HistoryMilestoneProps = {
  data: HistoryMilestoneData
  id?: string
  className?: string
  isLast?: boolean
}

type RelatedLinkCardProps = {
  id: string
  href: string
  label?: string
  description?: string
  type?: string
}

const RelatedLinkCard = ({ id, href, label, description, type }: RelatedLinkCardProps) => {
  const titleId = `${id}-title`
  const descriptionId = `${id}-description`
  const linkLabel = label ?? type ?? 'Related link'

  return (
    <a
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={styles.linkCardAnchor}
      href={href}
      rel="noopener noreferrer"
      tabIndex={0}
      target="_blank"
    >
      <Card className={styles.linkCard} hoverable size="small">
        <h4 className={styles.linkTitle} id={titleId}>
          {linkLabel}
        </h4>
        {description ? (
          <p className={styles.linkDescription} id={descriptionId}>
            {description}
          </p>
        ) : null}
        {type ? (
          <span className={styles.linkSource}>
            {type}
            <ExportOutlined aria-hidden className={styles.linkSourceIcon} />
          </span>
        ) : null}
      </Card>
    </a>
  )
}

const HistoryMilestone = ({
  data,
  id = data.id,
  className,
  isLast = false,
}: HistoryMilestoneProps) => {
  const titleId = `${id}-title`
  const linkId = `${id}-related-link`

  return (
    <section
      aria-labelledby={data.title ? titleId : undefined}
      className={classNames(styles.container, styles.switcher, isLast && styles.last, className)}
      id={id}
    >
      <div className={styles.imageContainer}>
        {data.image?.src ? (
          <Image
            alt={data.image.alt ?? data.title ?? 'History milestone'}
            className={styles.image}
            height={400}
            src={data.image.src}
            unoptimized
            width={600}
          />
        ) : null}
      </div>
      <div className={styles.contentContainer}>
        <time className={styles.date} dateTime={data.date.numeric}>
          {data.date.long}
        </time>
        {data.title ? (
          <h3 className={styles.milestoneTitle} id={titleId}>
            {data.title}
          </h3>
        ) : null}
        {data.body ? <Markdown>{data.body}</Markdown> : null}
        {data.link?.href ? (
          <RelatedLinkCard
            description={data.link.description}
            href={data.link.href}
            id={linkId}
            label={data.link.label}
            type={data.link.type}
          />
        ) : null}
      </div>
    </section>
  )
}

export default HistoryMilestone
