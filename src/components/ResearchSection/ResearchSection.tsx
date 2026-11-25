'use client'

import { Section } from '@core/core-ui'
import classNames from 'classnames'
import type { ReactNode } from 'react'

import styles from './ResearchSection.module.css'

export type ResearchSectionProps = {
  id: string
  title?: ReactNode
  subTitle?: ReactNode
  /** Title text alignment in the orange bar */
  titleAlign?: 'center' | 'start'
  className?: string
  children: ReactNode
}

/** Orange title bar with a row of cards below (used by /ref and /about/research-outputs). */
const ResearchSection = ({
  id,
  title,
  subTitle,
  titleAlign = 'center',
  className,
  children,
}: ResearchSectionProps) => (
  <Section className={classNames(styles.section, className)} id={id}>
    {title ? (
      <div className={classNames(styles.title, titleAlign === 'start' && styles.titleStart)}>
        {title}
      </div>
    ) : null}
    {subTitle ? <p className={styles.subTitle}>{subTitle}</p> : null}
    <div className={styles.content}>{children}</div>
  </Section>
)

type ResearchSectionItemProps = {
  /** Two cards per row on desktop instead of one */
  half?: boolean
  children: ReactNode
}

export const ResearchSectionItem = ({ half, children }: ResearchSectionItemProps) => (
  <div className={classNames(styles.item, half && styles.itemHalf)}>{children}</div>
)

export default ResearchSection
