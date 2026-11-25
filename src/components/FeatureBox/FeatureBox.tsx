'use client'

import { Button, Card, Typography } from 'antd'
import Image from 'next/image'

import styles from './FeatureBox.module.css'

const { Title } = Typography

export type FeatureBoxAction = {
  caption: string
  url: string
}

export type FeatureBoxProps = {
  iconSrc?: string
  title: string
  description: string
  tag?: string
  action: FeatureBoxAction
}

const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `/${url}`
}

const FeatureBox = ({ iconSrc, title, description, tag, action }: FeatureBoxProps) => (
  <Card className={styles.card} variant="borderless">
    {iconSrc ? (
      <Image
        alt={title}
        className={styles.cardLogo}
        height={63}
        src={iconSrc}
        width={96}
      />
    ) : null}
    <div className={styles.headerWrapper}>
      <Title className={styles.cardTitle} level={5}>
        {title}
      </Title>
      {tag ? <div className={styles.tag}>{tag}</div> : null}
    </div>
    <p className={styles.description}>{description}</p>
    <div className={styles.cardFooter}>
      <Button className={styles.button} href={resolveActionHref(action.url)} type="primary">
        {action.caption}
      </Button>
    </div>
  </Card>
)

export default FeatureBox
