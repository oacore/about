import React from 'react'
import { Col, Row } from 'reactstrap'

import { Markdown, Section } from '../../../components'
import styles from '../documentation.module.scss'

export default function Block(props) {
  const { column1, column2 } = props
  return (
    <Section className={`section-wide ${styles.block}`}>
      <Row>
        <Col md="6">
          <Markdown>{column1.trim()}</Markdown>
        </Col>
        <Col md="6">
          <Markdown>{column2.trim()}</Markdown>
        </Col>
      </Row>
    </Section>
  )
}
