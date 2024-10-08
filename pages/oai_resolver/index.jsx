import React from 'react'
import { Col, Row } from 'reactstrap'
import Parser from 'html-react-parser'
import { Link } from '@oacore/design'

import styles from './oai_resolver.module.scss'
import OAIResolveForm from './oai_resolver_form'
import { Layout } from '../../design-v2/components'

import { Page, Section } from 'components'
import oaiResolve from 'data/oai_resolve.yml'

const oaiResolverPage = () => (
  <Page
    title={oaiResolve.title}
    description={oaiResolve.description}
    keywords={oaiResolve.keywords}
  >
    <Layout>
      <Section
        id={styles.setOaiResolve}
        caption="set-oai-resolve"
        className="section-wide"
      >
        <Row>
          <Col className={styles.formBlock}>
            <div className={styles.logo} />
            <div id="oai-resolve-form" className={styles.oaiResolveForm}>
              <p>{oaiResolve.resolve.title}</p>
              <OAIResolveForm />
            </div>
          </Col>
          <Col className={styles.imgBlock}>
            <img
              src={oaiResolve.resolve.picture}
              alt={oaiResolve.resolve.title}
            />
          </Col>
        </Row>
      </Section>

      <Section id={styles.sections} caption="sections" className="section-wide">
        <Row className={styles.row}>
          {oaiResolve.sections.blocks.map((resolveGroup) => (
            <Col sm="3" md="3" className={styles['section-block']}>
              <p className={styles.serviceSectionDescription}>
                {Parser(resolveGroup.description)}
              </p>
              <span />
            </Col>
          ))}
        </Row>
      </Section>
      <Section id="oai-doc" caption="oai-doc" className="section-wide">
        <Row>
          <Col md="12">
            To find out more see{' '}
            <Link
              href="https://core.ac.uk/documentation/oai-resolver"
              target="_blank"
            >
              documentation.
            </Link>
          </Col>
        </Row>
      </Section>
    </Layout>
  </Page>
)

export default oaiResolverPage
