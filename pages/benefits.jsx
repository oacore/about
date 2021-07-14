import React from 'react'
import { Col, Row } from 'reactstrap'

import styles from './benefits.module.scss'

import { Button } from 'components/elements'
import { Page, Section } from 'components'
import benefitsData from 'data/benefits.yml'

const benefitsPage = () => (
  <Page
    title={benefitsData.title}
    description={benefitsData.description}
    keywords={benefitsData.keywords}
  >
    <Section id="banner" caption="banner" className={styles.banner}>
      <Row>
        <Col className={styles.columnDescription}>
          <div className={styles.title}>{benefitsData.banner.title}</div>
          <div className={styles.description}>
            {benefitsData.banner.description}
          </div>
          <Button>{benefitsData.banner.button}</Button>
        </Col>

        <Col className={styles.columnVelcro}>
          <div className={styles.velcroWrap}>
            <div className={styles.velcro}>
              <div className={styles.title}>
                {benefitsData.banner.velcro.title}
              </div>
              {benefitsData.banner.velcro.blocks.map((velcroGroup) => (
                <div>
                  <img
                    src={velcroGroup.picture}
                    alt={velcroGroup.title}
                    className={styles.velcroPicture}
                  />
                  <div className={styles.velcroTextBlock}>
                    <span className={styles.velcroTitle}>
                      {velcroGroup.title}
                    </span>
                    <span className={styles.velcroDescription}>
                      {velcroGroup.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Section>

    <Section id="sections" caption="sections">
      <h4>{benefitsData.sections.title}</h4>
      {benefitsData.sections.blocks.map((benefitsGroup) => (
        <Section
          key={benefitsGroup.id}
          id={benefitsGroup.id}
          caption={benefitsGroup.title}
          className={styles['service-section']}
        >
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
              <h6 className={styles['service-section-title']}>
                {benefitsGroup.title}
              </h6>
              <p className={styles.serviceSectionDescription}>
                {benefitsGroup.description}
              </p>
            </Col>
          </Row>
        </Section>
      ))}
    </Section>
    <Section id="statistic" caption="statistic" className={styles.statistic}>
      <div className={styles.title}>{benefitsData.statistic.title}</div>
      <Row>
        {benefitsData.statistic.blocks.map((statisticGroup) => (
          <Col tag="span">
            <div className={styles.statTitle}>{statisticGroup.title}</div>
            <div className={styles.statValue}>{statisticGroup.value}</div>
          </Col>
        ))}
      </Row>
    </Section>
    <Section id="join-core" caption="join-core" className={styles.joinCore}>
      <Row>
        <Col className={styles.formBlock}>
          <div>{benefitsData.join.title}</div>
        </Col>
        <Col className={styles.imgBlock}>
          <img src={benefitsData.join.picture} alt={benefitsData.join.title} />
        </Col>
      </Row>
    </Section>
  </Page>
)

export default benefitsPage
