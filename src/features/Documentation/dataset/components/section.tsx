'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import type { ReactNode } from 'react'

import { Section } from '@components/layout'
import type { DatasetAccentColor } from '@features/Documentation/dataset/types'

import styles from './styles.module.css'

const { Title } = Typography

export type DatasetSectionProps = {
  title?: string
  id?: string
  accentColor?: DatasetAccentColor
  className?: string
  fullWidth?: boolean
  children: ReactNode
}

const DatasetSection = ({
  title,
  id,
  accentColor,
  className,
  fullWidth = false,
  children,
}: DatasetSectionProps) => (
  <Section className={classNames(styles.section, className)} id={id}>
    {title ? (
      <Title className={classNames(styles.sectionTitle, accentColor && styles[accentColor])} level={4}>
        {title}
      </Title>
    ) : null}
    <div className={classNames(!fullWidth && styles.list)}>{children}</div>
  </Section>
)

export default DatasetSection
