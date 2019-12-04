import React from 'react'
import NextApp from 'next/app'
import { Layout, CookiesPopup } from 'components'
import { patchStats } from 'components/utils'
import config from 'data/core.yml'
import { settings as cookieSettingsContext } from 'data/cookies.yml'
import Router from 'next/router'
import withGA from 'next-ga'
import {
  isCookiesAccepted,
  getCookiesContext,
  handleCookiesUpdate,
} from './cookies'

const searchConfig = {
  action: '/search',
  name: 'q',
  placeholder: patchStats(config.searchPlaceholder, config.statistics),
}

const Cookies = () => (
  <CookiesPopup
    action="/cookies"
    method="post"
    title={cookieSettingsContext.popupTitle}
    items={getCookiesContext()}
    onSubmit={handleCookiesUpdate}
    submitCaption={cookieSettingsContext.acceptCaption}
  />
)

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx)

    return { pageProps }
  }

  render() {
    const { Component, pageProps, router } = this.props

    return (
      <>
        {router.route !== '/cookies' && !isCookiesAccepted() && <Cookies />}
        <Layout
          title={config.name}
          description={config.description}
          navigation={config.navigation}
          footer={config.footer}
          searchConfig={searchConfig}
          showSearch={router.route !== '/'}
          activeRoute={router.route}
        >
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}

export default withGA('UA-11307192-6', Router)(App)
