import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'

import useCookies from './cookies'

const useAnalytics = (cookieName) => {
  const [analyticsAllowed] = useCookies([cookieName])
  console.log({ analyticsAllowed })
  const enableAnalytics = analyticsAllowed === 'true'

  useEffect(() => {
    if (enableAnalytics && process.env.NODE_ENV === 'production') {
      console.log('enabling GA')
      // Initialise production Google Analytics
      ReactGA.initialize(process.env.GA_CODE)
    } else if (enableAnalytics) {
      window.ga = (...args) =>
        // We want to have logging in the development environment
        // eslint-disable-next-line no-console
        console.log(`ga(${JSON.stringify(args).slice(1, -1)})`)
    } else {
      // Disable Google Analytics
      window.ga = null
    }

    // This clean-up is quite tricky
    return () => {
      window.ga = null
    }
  }, [enableAnalytics, cookieName])

  return enableAnalytics
}

const usePageviewTracking = (analyticsAllowed) => {
  const router = useRouter()
  const reportPageview = useCallback((url) => {
    console.log('reportPageView')
    ReactGA.pageview(url)
  }, [])

  useEffect(() => {
    // Reporting first page view manually because the event doesn't fire
    reportPageview(router.asPath)
    router.events.on('routeChangeComplete', reportPageview)

    return () => {
      router.events.off('routeChangeComplete', reportPageview)
    }
  }, [analyticsAllowed])
}

export default useAnalytics
export { useAnalytics, usePageviewTracking }
