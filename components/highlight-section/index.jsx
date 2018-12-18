import React from 'react'
import { Row, Col } from 'reactstrap'
import { Section } from '../content'

import './highlight-section.scss'

const HighlightSection = ({ image, children }) => (
  <Section className="highlight-section">
    <Row>
      <Col md="5" lg="4">
        <img className="highlight-section-picture" src={image} alt="" />
      </Col>
      <Col md="7" lg="8">
        {children}
      </Col>
    </Row>
  </Section>
)

export default HighlightSection
