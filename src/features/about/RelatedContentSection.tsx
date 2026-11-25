'use client'

import { Section } from '@core/core-ui'
import { Button } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import type { ReactNode } from 'react'

import Markdown from '@components/Markdown/Markdown'
import type { AboutAction, AboutRelatedSection } from '@features/about/types'
import { resolveExternalTarget, resolveHref } from '@features/about/utils'

import styles from './styles.module.css'

type RelatedContentSectionProps = {
  id: string
  data?: AboutRelatedSection
  action?: AboutAction
  renderImage?: boolean
  className?: string
  children?: ReactNode
}

const RelatedContentSection = ({
  id,
  data,
  action,
  renderImage = false,
  className,
  children,
}: RelatedContentSectionProps) => {
  if (!data?.title && !data?.description && !data?.body && !children) {
    return null
  }

  const redirectHref = resolveHref(data?.href)
  const actionHref = resolveHref(action?.href)
  const extraHref = resolveHref(data?.extraAction?.href)

  return (
    <Section className={classNames(styles.related, className)} id={id}>
      {!renderImage && data?.iconUrl ? (
        <Image
          alt=""
          className={styles.relatedIcon}
          height={64}
          role="presentation"
          src={data.iconUrl}
          unoptimized
          width={64}
        />
      ) : null}
      {data?.title ? <h2 className={styles.relatedTitle}>{data.title}</h2> : null}
      {children ?? <Markdown>{data?.description ?? data?.body}</Markdown>}
      {renderImage && data?.iconUrl ? (
        <div className={styles.governanceImageWrapper}>
          <Image
            alt={data.title ?? 'Governance'}
            className={styles.governanceImage}
            height={240}
            src={data.iconUrl}
            unoptimized
            width={320}
          />
        </div>
      ) : null}
      <div className={styles.relatedActions}>
        {data?.urlRedirect && redirectHref ? (
          <Button
            href={redirectHref}
            rel={resolveExternalTarget(redirectHref) ? 'noopener noreferrer' : undefined}
            target={resolveExternalTarget(redirectHref)}
            type="primary"
          >
            {data.urlRedirect}
          </Button>
        ) : null}
        {action?.label && actionHref ? (
          <Button
            href={actionHref}
            rel={resolveExternalTarget(actionHref) ? 'noopener noreferrer' : undefined}
            target={resolveExternalTarget(actionHref)}
            type={renderImage ? 'primary' : 'link'}
          >
            {action.label}
          </Button>
        ) : null}
        {data?.extraAction?.label && extraHref ? (
          <Button
            className={styles.relatedExtraButton}
            href={extraHref}
            rel={resolveExternalTarget(extraHref) ? 'noopener noreferrer' : undefined}
            target={resolveExternalTarget(extraHref)}
            type="primary"
          >
            {data.extraAction.label}
          </Button>
        ) : null}
      </div>
    </Section>
  )
}

export default RelatedContentSection
