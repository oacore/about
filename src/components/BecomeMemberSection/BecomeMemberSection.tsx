'use client'

import { Button } from 'antd'

import { Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'

import styles from './BecomeMemberSection.module.css'
import Image from 'next/image';

export type BecomeMemberAction = {
  title: string
  url?: string
}

export type BecomeMemberService = {
  title?: string
  picture?: string
  description?: string
}

export type BecomeMemberSectionData = {
  title?: string
  action?: BecomeMemberAction
  services?: BecomeMemberService
}

export type BecomeMemberSectionProps = {
  data: BecomeMemberSectionData
  id?: string
  actionTarget?: string
  className?: string
}

const BecomeMemberSection = ({
  data,
  id = 'member',
  actionTarget = '_blank',
  className,
}: BecomeMemberSectionProps) => {
  const { title, action, services } = data

  if (!title && !action && !services) {
    return null
  }

  return (
    <Section className={className} id={id}>
      <div className={styles.serviceWrapper}>
        <div className={styles.mainTitleWrapper}>
          {title ? <h3 className={styles.title}>{title}</h3> : null}
          {action?.url ? (
            <Button
              href={action.url}
              rel={"_blank"}
              target={actionTarget}
              type="primary"
            >
              {action.title}
            </Button>
          ) : null}
        </div>
        {services ? (
          <div className={styles.service}>
            <div className={styles.serviceHeaderWrapper}>
              {services.picture ? (
                <Image className={styles.titlePicture} alt="titlePicture" height={46} src={services.picture} width={70} />
              ) : null}
              {services.title ? (
                <span className={styles.serviceTitle}>{services.title}</span>
              ) : null}
            </div>
            {services.description ? (
              <Markdown className={styles.serviceDescription}>{services.description}</Markdown>
            ) : null}
          </div>
        ) : null}
      </div>
    </Section>
  )
}

export default BecomeMemberSection
