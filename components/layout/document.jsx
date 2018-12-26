import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NextDocument, { Head, NextScript } from 'next/document'

/* eslint-disable */
class Main extends Component {
  static contextTypes = {
    _documentProps: PropTypes.any,
  }

  render() {
    const { html } = this.context._documentProps
    const { className = '', ...restProps } = this.props
    return (
      <div
        id="__next"
        className={`page ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
        {...restProps}
      />
    )
  }
}
/* eslint-enable */

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Document
export { Main }
