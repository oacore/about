'use client'

import { Card, Col, Row } from 'antd'

import type { AboutServiceSection } from '@features/about/types'
import { resolveHref } from '@features/about/utils'

import styles from './styles.module.css'

type ServiceGroupsProps = {
  sections: AboutServiceSection[]
}

const ServiceGroups = ({ sections }: ServiceGroupsProps) => {
  if (!sections.length) {
    return null
  }

  return (
    <Row className={styles.serviceGroups} gutter={[24, 24]}>
      {sections.map((section) => (
        <Col key={section.id} lg={8} md={8} xs={24}>
          <Card className={styles.serviceGroupCard} variant="borderless">
            <h4 className={styles.serviceGroupTitle}>{section.title}</h4>
            <ul className={styles.serviceGroupList}>
              {section.features.map((feature) => {
                const href = resolveHref(feature.action?.url)

                return (
                  <li className={styles.serviceGroupItem} key={feature.id}>
                    {href ? (
                      <a className={styles.serviceGroupLink} href={href}>
                        {feature.title}
                      </a>
                    ) : (
                      <span className={styles.serviceGroupFeatureTitle}>{feature.title}</span>
                    )}
                    {feature.shortDescription ? (
                      <span className={styles.serviceGroupDescription}>
                        {' '}
                        – {feature.shortDescription}
                      </span>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default ServiceGroups
