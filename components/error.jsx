import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Article } from './content'
import Link from './link'

class ErrorPage extends Component {
  static getInitialProps({ res, err }) {
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <Article>
        <h1>Uh-oh</h1>
        <p>The page you were looking for could not be found.</p>
        <p>To help you find what you are looking for, why not</p>
        <p>
          <Link href="~home" passHref>
            <Button color="primary">Go back to the homepage</Button>
          </Link>
          {' or '}
          <Link href="~contact" passHref>
            <Button color="primary" outline>
              Contact us
            </Button>
          </Link>
        </p>
      </Article>
    )
  }
}

export default ErrorPage
