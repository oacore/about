import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'
import { useCookie } from '@oacore/design'

export const useAnalytics = () => {
  const analyticsAllowed = useCookie('analytics_allowed')
  const router = useRouter()
  const reportPageview = useCallback((url) => {
    ReactGA.pageview(url)
  }, [])

  useEffect(() => {
    if (analyticsAllowed && process.env.NODE_ENV === 'production') {
      // Initialise production Google Analytics
      ReactGA.initialize(process.env.GA_CODE)
    } else if (analyticsAllowed) {
      window.ga = (...args) =>
        // We want to have logging in the development environment
        // eslint-disable-next-line no-console
        console.log(`ga(${JSON.stringify(args).slice(1, -1)})`)
    } else {
      // Disable Google Analytics
      window.ga = null
    }

    // Reporting first page view manually because the event doesn't fire
    reportPageview(router.asPath)

    // This clean-up is quite tricky
    return () => {
      window.ga = null
    }
  }, [analyticsAllowed])

  useEffect(() => {
    if (!analyticsAllowed) return () => {}

    router.events.on('routeChangeComplete', reportPageview)

    return () => {
      router.events.off('routeChangeComplete', reportPageview)
    }
  }, [analyticsAllowed])
}

export default useAnalytics
