'use client'

import { Section } from '@core/core-ui'
import classNames from 'classnames'
import Image from 'next/image'
import type { CSSProperties } from 'react'

import Markdown from '@components/Markdown/Markdown'

import styles from './ServiceSteps.module.css'

export type ServiceStep = {
  step: string
  title: string
  /** Markdown. */
  description: string
}

export type ServiceStepsProps = {
  title: string
  steps: ServiceStep[]
  /** Optional flow diagram shown under the steps, framed together with them. */
  image?: string
  imageAlt?: string
  id?: string
  className?: string
}

const ServiceSteps = ({ title, steps, image, imageAlt, id, className }: ServiceStepsProps) => {
  // Steps fill two columns top-to-bottom, so rows = half the step count.
  const gridStyle = { '--step-rows': Math.max(1, Math.ceil(steps.length / 2)) } as CSSProperties

  const content = (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid} style={gridStyle}>
        {steps.map((item) => (
          <div className={styles.item} key={item.step}>
            <div className={styles.step}>{item.step}</div>
            <div>
              <h5 className={styles.stepTitle}>{item.title}</h5>
              <Markdown className={styles.stepDescription}>{item.description}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </>
  )

  if (!image) {
    return (
      <Section className={classNames(styles.box, className)} id={id}>
        {content}
      </Section>
    )
  }

  return (
    <Section className={className} id={id}>
      <div className={styles.frame}>
        <div className={classNames(styles.box, styles.joined)}>{content}</div>
        <div className={styles.flow}>
          <Image
            alt={imageAlt ?? title}
            height={900}
            sizes="(max-width: 1240px) 100vw, 1240px"
            src={image}
            width={1600}
          />
        </div>
      </div>
    </Section>
  )
}

export default ServiceSteps
