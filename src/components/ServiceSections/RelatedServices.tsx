'use client'

import { Section } from '@core/core-ui'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'

import styles from './RelatedServices.module.css'

export type RelatedService = {
  title: string
  picture: string
  /** Used as-is: service pages rely on relative slugs (e.g. `api`) resolving under /services/. */
  url: string
}

export type RelatedServicesProps = {
  title?: string
  services?: RelatedService[]
  id?: string
  className?: string
}

const RelatedServices = ({
  title,
  services = [],
  id = 'related-services',
  className,
}: RelatedServicesProps) => (
  <Section className={className} id={id}>
    {title ? <h3 className={styles.title}>{title}</h3> : null}
    <div className={styles.services}>
      {services.map((service) => (
        <a className={styles.service} href={service.url} key={service.title}>
          {/* Intrinsic size of the content SVGs (viewBox 144x94); CSS caps the height at 50px. */}
          <Image
            alt={service.title}
            className={styles.image}
            height={94}
            src={service.picture}
            width={144}
          />
          <Markdown className={styles.serviceTitle}>{service.title}</Markdown>
        </a>
      ))}
    </div>
  </Section>
)

export default RelatedServices
