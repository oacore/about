import React from 'react'
import { Col, Row } from 'reactstrap'
import Parser from 'html-react-parser'
// TODO Remove Pareser after moving beenfits to netlify

import styles from './benefits.module.scss'
import AddDataProviderForm from './form'

import { Markdown, Page, Section } from 'components'
import benefitsData from 'data/benefits.yml'
import { patchStats } from 'components/utils'

const benefitsPage = () => (
  <Page
    title={benefitsData.title}
    description={benefitsData.description}
    keywords={benefitsData.keywords}
  >
    <Section id="banner" caption="banner" className={styles.banner}>
      <Row>
        <Col sm="6" md="6" className={styles.columnDescription}>
          <div className={styles.title}>{benefitsData.banner.title}</div>
          <div className={styles.description}>
            {benefitsData.banner.description}
          </div>
          <a
            title={benefitsData.banner.button}
            className={styles.buttonCustom}
            href="#join-core"
          >
            {benefitsData.banner.button}
          </a>
          <a href="//core.ac.uk/data-providers" className="btn btn-link">
            See the full list of data providers
          </a>
        </Col>
        <Col sm="6" md="6" className={styles.columnVelcro}>
          <div className={styles.velcroWrap}>
            <div className={styles.velcro}>
              <div className={styles.title}>
                {benefitsData.banner.velcro.title}
              </div>
              {benefitsData.banner.velcro.blocks.map((velcroGroup) => (
                <a href={`#${velcroGroup.id}`}>
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
                </a>
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
                {Parser(benefitsGroup.description)}
              </p>
            </Col>
          </Row>
        </Section>
      ))}
    </Section>
    <Section id="statistic" caption="statistic" className={styles.statistic}>
      <div className={styles.title}>{benefitsData.stat.title}</div>
      <Row>
        {benefitsData.stat.blocks.map((statisticGroup) => (
          <>
            {patchStats(statisticGroup.value, benefitsData.statistics) !==
              '<mark>0</mark>' && (
              <Col tag="span">
                <div className={styles.statTitle}>{statisticGroup.title}</div>
                <Markdown>
                  {patchStats(statisticGroup.value, benefitsData.statistics)}
                </Markdown>
              </Col>
            )}
          </>
        ))}
      </Row>
    </Section>
    <Section id="join-core" caption="join-core" className={styles.joinCore}>
      <Row>
        <Col className={styles.formBlock}>
          <div id="add-new-data-provider" className={styles.addDataProvider}>
            <p>{benefitsData.join.title}</p>
            <AddDataProviderForm />
          </div>
        </Col>
        <Col className={styles.imgBlock}>
          <img src={benefitsData.join.picture} alt={benefitsData.join.title} />
        </Col>
      </Row>
    </Section>
  </Page>
)

export default benefitsPage
