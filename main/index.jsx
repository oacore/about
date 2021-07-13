import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Header } from '@oacore/design'

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
  const [showSearchBar, setShowSearchBar] = useState(router.route !== '/')

  useEffect(() => {
    const show = router.route !== '/'
    if (showSearchBar !== show) setShowSearchBar(show)
  }, [router.route])
  const handleNavigation = useCallback((url) => router.push(url), [router])

  useAnalytics()

  Header.useSearchBar(
    {
      onQueryChanged: (searchTerm) => {
        window.location.href = `https://core.ac.uk/search?q=${encodeURIComponent(
          searchTerm
        )}`
      },
      initQuery: '',
      searchBarProps: {
        label: searchConfig.placeholder,
        placeholder: searchConfig.placeholder,
        prependIcon: '#magnify',
        changeOnBlur: false,
      },
    },
    { isHidden: router.route === '/' }
  )

  const cookiesAccepted = useCookie('cookies_accepted')
  const cookieHandler = useCookieHandler()

  let footerConfig = config.footer
  if (useRouter().route === '/benefits') footerConfig = config.footerV2

  return (
    <>
      <CookiesPopup
        action="/cookies"
        method="post"
        title={cookieSettingsContext.popupTitle}
        onSubmit={cookieHandler}
        submitCaption={cookieSettingsContext.acceptCaption}
        hidden={router.route === '/cookies' || cookiesAccepted}
      />
      <Layout
        title={config.name}
        description={config.description}
        navigation={config.navigation}
        footer={footerConfig}
        activeRoute={router.route}
        onNavigate={handleNavigation}
      >
        {children}
      </Layout>
    </>
  )
}

export default Main
