'use client'

import { Footer, Header, SiteCookiesPopup } from '@core/core-ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense, type ReactNode } from 'react'

import { siteConfig } from '@config/site'
import { useAnalytics } from '@hooks/useAnalytics'
import { getSearchUrl } from '@utils/resolveHref'

import styles from './SiteFrame.module.css'

type SiteFrameProps = {
  children: ReactNode
  /** e.g. "Search 452M papers from around the world" (patched on the server). */
  searchPlaceholder: string
}

const Analytics = () => {
  useAnalytics({ title: siteConfig.name })

  return null
}

// Long documentation guides have their own sticky nav; the old layout hid the footer there
const NO_FOOTER_PATHS = [
  'membership-documentation',
  'data-providers-guide',
  'fair-repository-certification',
  'graph-documentation',
]

// Header search sends people to CORE Search, like the old site's Header.useSearchBar
const handleSearch = (query: string) => {
  const term = query.trim()

  if (term) {
    window.location.assign(getSearchUrl(term))
  }
}

const SiteFrame = ({ children, searchPlaceholder }: SiteFrameProps) => {
  const pathname = usePathname() ?? ''
  const showFooter = !NO_FOOTER_PATHS.some((path) => pathname.includes(path))

  return (
    <div className={styles.shell}>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <a className={styles.skipLink} href="#content">
        Skip to main content
      </a>
      {/* core-ui Header: the design-system header of the old site; Next.js Link for internal pages */}
      <Header
        linkComponent={Link}
        pathname={pathname}
        search={{ onSearch: handleSearch, placeholder: searchPlaceholder }}
      />
      <main className={styles.main} id="content">
        {children}
      </main>
      {showFooter ? <Footer /> : null}
      <SiteCookiesPopup hidden={pathname === '/cookies'} linkComponent={Link} />
    </div>
  )
}

export default SiteFrame
