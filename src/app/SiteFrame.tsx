'use client'

import { Footer, Header } from '@core/core-ui'
import { usePathname } from 'next/navigation'
import { Suspense, type ReactNode } from 'react'

import CookiesPopup from '@components/CookiesPopup/CookiesPopup'
import { siteConfig } from '@config/site'
import { useAnalytics } from '@hooks/useAnalytics'

import styles from './SiteFrame.module.css'

type SiteFrameProps = {
  children: ReactNode
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

const SiteFrame = ({ children }: SiteFrameProps) => {
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
      <Header />
      <main className={styles.main} id="content">
        {children}
      </main>
      {showFooter ? <Footer /> : null}
      <CookiesPopup />
    </div>
  )
}

export default SiteFrame
