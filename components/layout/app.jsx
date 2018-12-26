import React from 'react'
import NextApp, { Container as NextContainer } from 'next/app'
import Layout from './layout'

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx)

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <NextContainer>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextContainer>
    )
  }
}

export default App
