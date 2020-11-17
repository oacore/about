import React from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import { useAnalytics } from '../hooks'
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

  useAnalytics()

  const [cookies] = useCookies(['cookies_accepted'])
  const cookiesAllowed = cookies.cookies_accepted === 'true'

  return (
    <>
      {router.route !== '/cookies' && !cookiesAllowed && (
        <CookiesPopup
          action="/cookies"
          method="post"
          title={cookieSettingsContext.popupTitle}
          items={useCookieItems()}
          onSubmit={useCookieHandler()}
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
