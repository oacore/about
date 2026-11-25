'use client'

import classNames from 'classnames'

import { Section } from '@components/layout'

import FeatureDescription from './FeatureDescription'

import styles from './ServiceFeatures.module.css'

export type ServiceFeature = {
  title: string
  description: string
  /** Markdown revealed by hovering `tooltipLabel` inside the description. */
  tooltip?: string
  tooltipLabel?: string
}

export type ServiceFeaturesProps = {
  features?: ServiceFeature[]
  id?: string
  className?: string
}

const ServiceFeatures = ({ features = [], id = 'features', className }: ServiceFeaturesProps) => {
  if (!features.length) {
    return null
  }

  return (
    <Section className={classNames(styles.features, className)} id={id}>
      {features.map((feature) => (
        <div className={styles.feature} key={feature.title}>
          <h6 className={styles.featureTitle}>{feature.title}</h6>
          <FeatureDescription
            className={styles.featureText}
            description={feature.description}
            tooltip={feature.tooltip}
            tooltipLabel={feature.tooltipLabel}
          />
        </div>
      ))}
    </Section>
  )
}

export default ServiceFeatures
