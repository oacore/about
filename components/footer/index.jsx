import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'

import Markdown from '../markdown'
import Link from '../link'
import styles from './footer.module.scss'

const Footer = ({ usefulLinks, partners, researchOutputs, className = '' }) => (
  <footer className={`${styles.footer} ${className}`}>
    <Container>
      <Row className={styles.footerHighlights}>
        <Col md={{ size: 6, offset: 1 }} tag="aside">
          <h4>Useful links</h4>
          <ul className={styles.footerHighlightsList}>
            {usefulLinks.map(({ title, path }) => (
              <li key={`${title} @ ${path}`}>
                <Link href={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col md="4">
          <aside className={styles.footerCiteInfo}>
            <h6>Writing about CORE?</h6>
            <Markdown>{researchOutputs}</Markdown>
          </aside>
        </Col>
      </Row>

      <div className={styles.footerPartners}>
        <a
          id="footer-logo-ou"
          className={`${styles.footerPartnersItem} ${styles.footerPartnersLogo}`}
          href="https://www.open.ac.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/logos/ou.png" alt="The Open University" />
        </a>
        <a
          id="footer-logo-jisc"
          className={`${styles.footerPartnersItem} ${styles.footerPartnersLogo}`}
          href="https://www.jisc.ac.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/logos/jisc.svg" alt="Jisc" />
        </a>
        <Markdown
          className={`${styles.footerPartnersItem} ${styles.footerPartnersText}`}
        >
          {partners}
        </Markdown>
      </div>
    </Container>
  </footer>
)

Footer.propTypes = {
  usefulLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  researchOutputs: PropTypes.string.isRequired,
  partners: PropTypes.string.isRequired,
}

export default Footer
