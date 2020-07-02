import React from 'react'
import Router from 'next/router'
import withGA from 'next-ga'

import {
  isCookiesAccepted,
  getCookiesContext,
  handleCookiesUpdate,
} from './cookies'

import 'components/index.scss'
import { Layout, CookiesPopup } from 'components'
import { patchStats } from 'components/utils'
import config from 'data/core.yml'
import { settings as cookieSettingsContext } from 'data/cookies.yml'

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

const App = ({ Component, pageProps, router }) => (
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

const isAnalyticsEnabled = () => {
  const { value, default: defaultValue } = getCookiesContext().analytics
  return value != null ? value : defaultValue
}

const gaCode =
  process.env.NODE_ENV === 'production' &&
  isAnalyticsEnabled() &&
  process.env.GA_CODE

export default gaCode ? withGA(gaCode, Router)(App) : App
