import React from 'react'
import { Col, Row } from 'reactstrap'

import styles from './benefits.module.scss'

import { Page, Content, Section } from 'components'
import benefitsData from 'data/benefits.yml'

const benefitsPage = () => (
  <Page
    title={benefitsData.title}
    description={benefitsData.description}
    keywords={benefitsData.keywords}
  >
    <h4>{benefitsData.sections.title}</h4>

    {benefitsData.sections.blocks.map((benefitsGroup) => (
      <Section
        key={benefitsGroup.id}
        id={benefitsGroup.id}
        caption={benefitsGroup.title}
        className={styles['service-section']}
      >
        <Row className={styles['service-section-title']} tag="h6">
          <Col sm="6" md="8" tag="span">
            {benefitsGroup.title}
          </Col>
        </Row>

        <Row className={styles['service-section-content']}>
          <Col sm="6" md="4">
            {benefitsGroup.picture && (
              <figure>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img
                  className={styles['service-section-picture']}
                  src={benefitsGroup.picture}
                  alt={`${benefitsGroup.title}'s picture`}
                />
              </figure>
            )}
          </Col>
          <Col sm="6" md="8">
            <Content
              markdown
              id={benefitsGroup.description}
              key={benefitsGroup.description}
            >
              {benefitsGroup.description}
            </Content>
          </Col>
        </Row>
      </Section>
    ))}
  </Page>
)

export default benefitsPage
