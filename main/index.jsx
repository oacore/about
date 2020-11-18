import React from 'react'
import { useRouter } from 'next/router'

import { useAnalytics } from '../hooks'
import { useCookieHandler, useCookie } from '../components/cookies/hooks'

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

  useAnalytics()

  const cookiesAccepted = useCookie('cookies_accepted')
  const cookieHandler = useCookieHandler()

  return (
    <>
      {router.route !== '/cookies' && !cookiesAccepted && (
        <CookiesPopup
          action="/cookies"
          method="post"
          title={cookieSettingsContext.popupTitle}
          onSubmit={cookieHandler}
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
