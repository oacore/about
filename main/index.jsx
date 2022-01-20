import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Header, Cookies as CookiesPopup } from '@oacore/design'

import { useAnalytics } from '../hooks'

import { Layout } from 'components'
import { patchStats } from 'components/utils'
import config from 'data/core.yml'

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

  Header.useSearchBar({
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
  })

  return (
    <>
      <Layout
        title={config.name}
        description={config.description}
        navigation={config.navigation}
        footer={config.footer}
        activeRoute={router.route}
        onNavigate={handleNavigation}
      >
        {children}
      </Layout>
      <CookiesPopup />
    </>
  )
}

export default Main
