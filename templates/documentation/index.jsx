import React from 'react'
import { Col, Row } from 'reactstrap'

import faqData from '../../data/faq.yml'
import styles from './documentation.module.scss'

import { Page, Section, Content, Markdown, Accordion } from 'components'

const Block = ({ column1, column2 }) => (
  <Section className={`section-wide ${styles.block}`}>
    <Row>
      <Col md="6">
        <Markdown>{column1}</Markdown>
      </Col>
      <Col md="6">
        <Markdown>{column2}</Markdown>
      </Col>
    </Row>
  </Section>
)

const itemToURL = (id) => {
  const url = new URL(window.location)
  url.hash = id ? `#${id}` : ''
  window.history.replaceState({}, null, url.toString())
}

const FAQsSection = ({ items = [] }) => (
  <Content>
    <Accordion onToggle={itemToURL}>
      {items.map(({ slug, question, answer }) => (
        <Accordion.Item id={slug} title={question} key={slug}>
          <Markdown>{answer}</Markdown>
        </Accordion.Item>
      ))}
    </Accordion>
  </Content>
)

const faqDataAggregation = faqData.sections
  .filter((item) =>
    ['aggregation'].every((val) => item.id.indexOf(val) > -1)
  )[0]
  .sections.find((item) => item.id === 'technical-aggregation')
  .items.filter((elem) =>
    ['what-is-oai-base-url', 'oai-about', 'oai-not-resolve'].includes(elem.slug)
  )

const DocumentationPageOaiResolver = ({ data }) => (
  <Page
    title={data.title}
    description={data.description}
    className={styles.page}
  >
    <Section className="section-wide">
      <Row>
        <Col md="12">
          <img
            src="/images/logo/OAI-resolver.png"
            alt="OAI resolver"
            width="170px"
            height="82px"
          />
          <br />
          <Content markdown>{data.body}</Content>
        </Col>
      </Row>
    </Section>

    <Block column1={data.block1Column1} column2={data.block1Column2} />
    <Block column1={data.block2Column1} column2={data.block2Column2} />
    <Block column1={data.block3Column1} column2={data.block3Column2} />
    <Block column1={data.block4Column1} column2={data.block4Column2} />

    <Section className="section-wide">
      <Row>
        <Col md="12">
          <h5>FAQs</h5>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <br />
          <FAQsSection items={faqDataAggregation} />
          <br />
        </Col>
      </Row>
    </Section>
  </Page>
)

export default DocumentationPageOaiResolver