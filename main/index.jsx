import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { useAnalytics, usePageviewTracking } from '../hooks'
import { useCookieItems, useCookieHandler } from '../hooks/cookies'

import { Layout, CookiesPopup } from 'components'
import { patchStats } from 'components/utils'
import config from 'data/core.yml'
import { settings as cookieSettingsContext } from 'data/cookies.yml'

const searchConfig = {
  action: '/search',
  name: 'q',
  placeholder: patchStats(config.searchPlaceholder, config.statistics),
}

const Main = ({ children }) => {
  const router = useRouter()

  const [cookiesAccepted] = useCookies(['cookies_accepted'])
  const cookiesAllowed = cookiesAccepted === 'true'

  const analyticsAllowed = useAnalytics('analytics_allowed')
  usePageviewTracking(analyticsAllowed)

  const cookieItems = useCookieItems()
  const cookieHandler = useCookieHandler({ patchDefaults: true })
  const [, forceUpdate] = useState({})

  const handleCookiesUpdate = useCallback(
    (...args) => {
      cookieHandler(...args)
      // Forcing update of the whole application since cookieHandled
      // cannot do so using the local state
      forceUpdate({})
    },
    [cookieHandler, forceUpdate]
  )

  return (
    <>
      {router.route !== '/cookies' && !cookiesAllowed && (
        <CookiesPopup
          action="/cookies"
          method="post"
          title={cookieSettingsContext.popupTitle}
          items={cookieItems}
          onSubmit={handleCookiesUpdate}
          submitCaption={cookieSettingsContext.acceptCaption}
        />
      )}
      <Layout
        title={config.name}
        description={config.description}
        navigation={config.navigation}
        footer={config.footer}
        searchConfig={searchConfig}
        showSearch={router.route !== '/'}
        activeRoute={router.route}
      >
        {children}
      </Layout>
    </>
  )
}

export default Main
