import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Markdown from '../markdown'
import Link from '../link'

const Footer = ({ usefulLinks, partners, researchOutputs, className = '' }) => (
  <footer className={`footer ${className}`}>
    <Container>
      <Row className="footer-highlights">
        <Col md={{ size: 6, offset: 1 }} tag="aside">
          <h4>Useful links</h4>
          <ul className="footer-highlights-list">
            {usefulLinks.map(({ title, path }) => (
              <li key={`${title} @ ${path}`}>
                <Link href={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col md="4">
          <aside className="footer-cite-info">
            <h6>Writing about CORE?</h6>
            <Markdown>{researchOutputs}</Markdown>
          </aside>
        </Col>
      </Row>

      <div className="footer-partners">
        <a
          className="footer-partners-logo"
          href="https://www.open.ac.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/static/images/logos/ou.png" alt="The Open University" />
        </a>
        <a
          className="footer-partners-logo"
          href="https://www.jisc.ac.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/static/images/logos/jisc.svg" alt="Jisc" />
        </a>
        <Markdown>{partners}</Markdown>
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
