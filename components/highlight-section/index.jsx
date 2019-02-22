import React from 'react'
import { Row, Col } from 'reactstrap'
import { Section } from '../content'
import Link from '../link'

import './highlight-section.scss'

const HighlightSection = ({ image, action, children }) => (
  <Section className="highlight-section">
    <Row>
      <Col md="5" lg="4">
        <Link href={action} passHref>
          <a href={action}>
            <img className="highlight-section-picture" src={image} alt="" />
          </a>
        </Link>
      </Col>
      <Col md="7" lg="8">
        {children}
      </Col>
    </Row>
  </Section>
)

export default HighlightSection
