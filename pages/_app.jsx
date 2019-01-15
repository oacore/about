import React from 'react'
import NextApp, { Container as NextContainer } from 'next/app'
import Layout from 'components/layout'
import config from 'data/core.yml'

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
        <Layout
          title={config.name}
          description={config.description}
          navigation={config.navigation}
          footer={config.footer}
        >
          <Component {...pageProps} />
        </Layout>
      </NextContainer>
    )
  }
}

export default App
