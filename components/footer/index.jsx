import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'

import './footer.scss'

/* eslint-disable jsx-a11y/anchor-is-valid */

const Footer = ({ links }) => (
  <footer className="footer">
    <Container>
      <div className="footer-highlights">
        <Col xs="12" md={{ size: 6, offset: 1 }} className="p-0">
          <h4>Useful links</h4>
          <Row>
            {links.map(({ title, path }) => (
              <Col xs="12" md="4" key={path}>
                <Link href={path}>
                  <a>{title}</a>
                </Link>
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
