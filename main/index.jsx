import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Header, Cookies as CookiesPopup } from '@oacore/design'
import { Button } from '@oacore/design/lib/elements'

import { useAnalytics } from '../hooks'
import styles from './styles.module.scss'
import openAccess from '../data/openAccess.yml'

import { Layout, Markdown } from 'components'
import { patchStats } from 'components/utils'
import config from 'data/core.yml'

const searchConfig = {
  action: '/search',
  name: 'q',
  placeholder: patchStats(config.searchPlaceholder, config.statistics),
}

const Main = ({ children }) => {
  const router = useRouter()

  const handleNavigation = useCallback((url) => router.push(url), [router])

  useAnalytics({ title: config.name })

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
        {router.asPath.includes('how-core-supports-open-access') && (
          <div className={styles.spacer} />
        )}
        {children}
        {router.asPath.includes('how-core-supports-open-access') && (
          <div className={styles.serviceMainWrapper}>
            <div className={styles.serviceWrapper}>
              {openAccess.services.map((service) => (
                <div className={styles.service}>
                  <div className={styles.headerWrapper}>
                    <img
                      className={styles.titlePicture}
                      src={service.picture}
                      alt={service.title}
                    />
                    <span className={styles.serviceTitle}>{service.title}</span>
                  </div>
                  <div>
                    <Markdown className={styles.serviceDescription}>
                      {service.description}
                    </Markdown>
                    <Button variant="outlined" href={service.action[0].url}>
                      {service.action[0].title}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Layout>
      <CookiesPopup />
    </>
  )
}

export default Main
