'use client'

import { Button } from 'antd'

import Markdown from '@components/Markdown/Markdown'

import styles from './ServiceMainWrapper.module.css'

export type ServiceMainWrapperAction = {
  url: string
  title: string
}

export type ServiceMainWrapperService = {
  picture: string
  title: string
  description: string
  action: ServiceMainWrapperAction[]
}

export type ServiceMainWrapperProps = {
  services: ServiceMainWrapperService[]
}

const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `/${url}`
}

const ServiceMainWrapper = ({ services }: ServiceMainWrapperProps) => {
  if (!services.length) {
    return null
  }

  return (
    <div className={styles.serviceMainWrapper}>
      <div className={styles.serviceWrapper}>
        {services.map((service) => {
          const primaryAction = service.action[0]

          return (
            <div className={styles.service} key={service.title}>
              <div className={styles.headerWrapper}>
                <img
                  alt={service.title}
                  className={styles.titlePicture}
                  src={service.picture}
                />
                <span className={styles.serviceTitle}>{service.title}</span>
              </div>
              <div>
                <Markdown className={styles.serviceDescription}>{service.description}</Markdown>
                {primaryAction ? (
                  <Button href={resolveActionHref(primaryAction.url)} type="default" variant="outlined">
                    {primaryAction.title}
                  </Button>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ServiceMainWrapper
