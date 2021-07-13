import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'

import Markdown from '../../markdown'
import Link from '../../link'
import styles from './footer.module.scss'

const FooterDesign2 = ({
  usefulLinks,
  partners,
  researchOutputs,
  className = '',
}) => (
  <footer className={`${styles.footer} ${className}`}>
    <Container>
      <Row className={styles.footerHighlights}>
        <Col>Logo</Col>

        {usefulLinks.map(({ titleBlock, menu }) => (
          <Col>
            <div>{titleBlock}</div>
            <ul className={styles.footerHighlightsList}>
              {menu.map(({ title, path }) => (
                <li key={`${title} @ ${path}`}>
                  <Link href={path}>{title}</Link>
                </li>
              ))}
            </ul>
          </Col>
        ))}

        <Col>
          <div className={styles.footerCiteInfo}>
            <div className={styles.columnLeft}>
              <h6>Writing about CORE?</h6>
              <Markdown>{researchOutputs}</Markdown>
            </div>
            <div>
              <img src="/images/benefits/writing_about_core.svg" alt="Jisc" />
            </div>
          </div>

          <div className={styles.footerPartners}>
            <a
              id="footer-logo-jisc"
              className={`${styles.footerPartnersItem} ${styles.footerPartnersLogo}`}
              href="https://www.jisc.ac.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/logos/jisc.svg" alt="Jisc" />
            </a>

            <a
              id="footer-logo-ou"
              className={`${styles.footerPartnersItem} ${styles.footerPartnersLogo}`}
              href="https://www.open.ac.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="images/logos/ou.svg" alt="The Open University" />
            </a>

            <Markdown
              className={`${styles.footerPartnersItem} ${styles.footerPartnersText}`}
            >
              {partners}
            </Markdown>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
)

FooterDesign2.propTypes = {
  usefulLinks: PropTypes.arrayOf(
    PropTypes.shape({
      titleBlock: PropTypes.string.isRequired,
      menu: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  researchOutputs: PropTypes.string.isRequired,
  partners: PropTypes.string.isRequired,
}

export default FooterDesign2
