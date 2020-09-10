import React from 'react'
import { Row, Col } from 'reactstrap'

import styles from './highlight-section.module.scss'
import { Section } from '../content'
import Link from '../link'

const HighlightSection = ({ image, action, children }) => (
  <Section className={styles.highlightSection}>
    <Row>
      <Col className={styles.row} md="5" lg="4">
        <Link href={action} passHref>
          <a href={action}>
            <img
              className={styles.highlightSectionPicture}
              src={image}
              alt=""
              role="presentation"
            />
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
