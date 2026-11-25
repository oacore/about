'use client'

import { Button } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'

import { useCookie, useCookieHandler, useCookieItems } from '@hooks/use-cookies'

import styles from './CookiesPopup.module.css'

const subscribeNoop = () => () => {}

const CookiesPopup = () => {
  const pathname = usePathname()
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )
  const essentialAllowed = useCookie('essential_cookies_allowed')
  const cookieItems = useCookieItems()
  const handleCookieConsent = useCookieHandler()

  if (!isClient || essentialAllowed || pathname === '/cookies') {
    return null
  }

  const allCookieNames = cookieItems.map(({ name }) => name).join(',')

  return (
    <div aria-label="Cookie consent" className={styles.popup} id="cookies-popup" role="region">
      <div className={styles.body}>
        <p>We use cookies to improve our website.</p>
        <Link className={styles.link} href="/cookies">
          Learn more
        </Link>
      </div>
      <div className={styles.actions}>
        <Button
          className={`${styles.button} ${styles.buttonOutlined}`}
          id="essential_cookies_allowed"
          onClick={handleCookieConsent}
        >
          Essential cookies only
        </Button>
        <Button className={styles.button} id={allCookieNames} onClick={handleCookieConsent}>
          I agree
        </Button>
      </div>
    </div>
  )
}

export default CookiesPopup
