import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga4'
import { useCookie } from '@oacore/design'

export const useAnalytics = (options) => {
  const title = options
  const analyticsAllowed = useCookie('analytics_cookies_allowed')
  const router = useRouter()
  const reportPageview = useCallback(
    // eslint-disable-next-line no-shadow
    (url, title, hitType = 'pageview') => {
      const pathName =
        window.location.pathname === '/'
          ? 'core.ac.uk'
          : window.location.pathname

      ReactGA.send({
        hitType,
        page: url,
        title: typeof title === 'string' ? title : pathName,
      })
    },
    []
  )

  useEffect(() => {
    if (analyticsAllowed && (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'azure')) {
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
    reportPageview(router.asPath, title)

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
