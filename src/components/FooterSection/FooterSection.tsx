'use client'

import { Button } from 'antd'
import classNames from 'classnames'

import { Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'

import styles from './FooterSection.module.css'

export type FooterSectionAction = {
  text?: string
  href?: string
}

export type FooterSectionVariant = 'outlined' | 'filled'

export type FooterSectionProps = {
  content?: string
  action?: FooterSectionAction
  className?: string
  variant?: FooterSectionVariant
}

const FooterSection = ({
  content,
  action,
  className,
  variant = 'outlined',
}: FooterSectionProps) => {
  if (!content) {
    return null
  }

  const isFilled = variant === 'filled'

  return (
    <Section className={classNames(styles.footerWrapper, className)}>
      <Markdown className={styles.footerText}>{content}</Markdown>
      {action?.href ? (
        <Button
          href={action.href}
          target="_blank"
          type={isFilled ? 'primary' : 'default'}
          variant={isFilled ? 'solid' : 'outlined'}
        >
          {action.text}
        </Button>
      ) : null}
    </Section>
  )
}

export default FooterSection
