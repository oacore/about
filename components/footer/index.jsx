import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Link from '../link'

import './footer.scss'

const Footer = ({ links }) => (
  <footer className="footer">
    <Container>
      <div className="footer-highlights">
        <Col xs="12" md={{ size: 6, offset: 1 }} className="p-0">
          <p className="h4">Useful links</p>
          <Row>
            {links.map(({ title, path }) => (
              <Col xs="12" md="4" key={`${title} @ ${path}`}>
                <Link href={path}>{title}</Link>
              </Col>
            ))}
          </Row>
        </Col>
      </div>

      <p className="m-0 py-3">
        © Knowledge Media Institute. Open University, {new Date().getFullYear()}
      </p>
    </Container>
  </footer>
)

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Footer
