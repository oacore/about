import React from 'react'
import { Container } from 'reactstrap'

const SkipToContent = ({ path, caption }) => (
  <div className="bg-light">
    <Container>
      <a
        className="btn btn-outline-primary sr-only sr-only-focusable p-1 my-1"
        href={path}
        passHref
      >
        {caption}
      </a>
    </Container>
  </div>
)

export default SkipToContent
