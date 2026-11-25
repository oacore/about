'use client'

import { Button, Card, Typography } from 'antd'
import Image from 'next/image'

import type { ServiceFeature } from '../types'

import styles from '../page.module.css'

const { Paragraph, Title, Text } = Typography

const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `/${url}`
}

type FeatureBoxProps = {
  feature: ServiceFeature
}

const FeatureBox = ({ feature }: FeatureBoxProps) => {
  const description =
    feature.description?.trim() || feature.shortDescription?.trim() || ''
  const { action, recommender, title } = feature
  // TODO
  const href = resolveActionHref(action.url)

  return (
    <Card className={styles.card} variant="borderless">
      <div className={styles.cardBody}>
        {feature.logo ? (
          <Image
            alt={title}
            className={styles.cardLogo}
            height={63}
            src={feature.logo}
            width={96}
          />
        ) : null}
        <Title level={5} className={styles.cardTitle}>
          {title}
        </Title>
        <Paragraph className={styles.description}>{description}</Paragraph>
      </div>
      <div className={styles.cardFooter}>
        <Text className={styles.cardFooterCaption}>Recommended for:</Text>
        <div className={styles.cardRecommender}>
          {recommender.map((item, index) => (
            <span key={`${item.title}-${index}`} className={styles.item}>
              {item.title}
            </span>
          ))}
        </div>
        <Button type="primary" href={href}>
          {action.caption}
        </Button>
      </div>
    </Card>
  )
}

export default FeatureBox
