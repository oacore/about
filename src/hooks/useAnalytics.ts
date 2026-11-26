'use client'

import { useCookie } from '@core/core-ui'
import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import ReactGA from 'react-ga4'

const DEV_MEASUREMENT_ID = 'G-2ZWQFDN91Z'
const ROOT_PAGE_TITLE = 'about-core-container-e2cxc9hzbfdjcgar.uksouth-01.azurewebsites.net'

const nodeEnv = String(process.env.NODE_ENV)
const isProduction = nodeEnv === 'production'
const isDevelopmentAnalytics = nodeEnv === 'development' || nodeEnv === 'azure'

type UseAnalyticsOptions = {
  title?: string
}

type PageView = {
  hitType: string
  page: string
  title: string
}

type AnalyticsCommand = (...args: unknown[]) => void

declare global {
  interface Window {
    ga?: AnalyticsCommand | null
  }
}

const readAnalyticsAllowed = () => Cookies.get('analytics_cookies_allowed') === 'true'

const resolvePageTitle = (title?: string) => {
  if (typeof title === 'string') {
    return title
  }

  if (window.location.pathname === '/') {
    return ROOT_PAGE_TITLE
  }

  return window.location.pathname
}

const buildPagePath = (pathname: string, search: string) => {
  if (!search) {
    return pathname
  }

  return `${pathname}?${search}`
}

export const useAnalytics = ({ title }: UseAnalyticsOptions = {}) => {
  const analyticsAllowed = useCookie('analytics_cookies_allowed')
  const pathname = usePathname() ?? '/'
  const searchParams = useSearchParams()
  const page = buildPagePath(pathname, searchParams.toString())
  const pageRef = useRef(page)
  const titleRef = useRef(title)
  const trackedPageRef = useRef<string | null>(null)
  const reportedKeyRef = useRef<string | null>(null)

  pageRef.current = page
  titleRef.current = title

  const reportPageview = useCallback((url: string, pageTitle?: string, hitType = 'pageview') => {
    const payload: PageView = {
      hitType,
      page: url,
      title: resolvePageTitle(pageTitle),
    }

    if (typeof window.ga === 'function') {
      window.ga('send', payload)
      return
    }

    ReactGA.send(payload)
  }, [])

  useEffect(() => {
    const allowed = readAnalyticsAllowed()
    let trackingEnabled = false

    window.ga = null

    if (allowed && isProduction) {
      // next.config exposes GA_CODE (as the old site did); NEXT_PUBLIC_GA_CODE was never set,
      // so production analytics never started.
      const measurementId = process.env.GA_CODE

      if (measurementId) {
        ReactGA.initialize(measurementId)
        trackingEnabled = true
      }
    } else if (allowed) {
      // Log hits locally when analytics cookies are allowed outside production.
      window.ga = (...args: unknown[]) => {
        console.log(`ga(${JSON.stringify(args).slice(1, -1)})`)
      }
      trackingEnabled = true
    } else if (isDevelopmentAnalytics) {
      ReactGA.initialize(DEV_MEASUREMENT_ID)
      trackingEnabled = true
    }

    if (trackingEnabled) {
      const url = pageRef.current
      const pageTitle = titleRef.current
      const reportKey = `${allowed}:${url}:${pageTitle ?? ''}`

      if (reportedKeyRef.current !== reportKey) {
        reportedKeyRef.current = reportKey
        reportPageview(url, pageTitle)
      }
    }

    return () => {
      window.ga = null
    }
  }, [analyticsAllowed, reportPageview])

  useEffect(() => {
    if (!readAnalyticsAllowed()) {
      trackedPageRef.current = null
      return
    }

    if (trackedPageRef.current === null || trackedPageRef.current === page) {
      trackedPageRef.current = page
      return
    }

    trackedPageRef.current = page
    reportPageview(page, title)
  }, [analyticsAllowed, page, reportPageview, title])
}
