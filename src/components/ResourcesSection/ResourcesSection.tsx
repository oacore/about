'use client'

import { Section } from '@core/core-ui'
import { Col, Row } from 'antd'
import type { ReactNode } from 'react'

import OutreachMaterials, {
  hasResourceAction,
  type OutreachLinkClickHandler,
  type OutreachMaterial,
} from '@components/outreach-materials'

import styles from './ResourcesSection.module.css'

export type ResourcesSectionProps = {
  id: string
  title?: string
  resources: OutreachMaterial[]
  /** Click on the button of a resource that has an action (e.g. "badges" opens a popup) */
  onActionClick?: () => void
  onLinkClick?: OutreachLinkClickHandler
  /** Extra content after the cards (description, popups) */
  children?: ReactNode
}

/** Section title with a grid of outreach material cards (about and ambassadors pages). */
const ResourcesSection = ({
  id,
  title,
  resources,
  onActionClick,
  onLinkClick,
  children,
}: ResourcesSectionProps) => {
  if (!title && !resources.length) {
    return null
  }

  return (
    <Section id={id}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {resources.length ? (
        <Row gutter={[24, 24]} role="list">
          {resources.map((resource) => (
            <Col key={resource.id} lg={6} md={8} role="listitem" sm={12} xs={24}>
              <OutreachMaterials
                onActionClick={hasResourceAction(resource) ? onActionClick : undefined}
                onLinkClick={onLinkClick}
                resource={resource}
              />
            </Col>
          ))}
        </Row>
      ) : null}
      {children}
    </Section>
  )
}

export default ResourcesSection
