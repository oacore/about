import React, { useEffect, useRef } from 'react'

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

// Environment variables are replaced in the bundle using DefinePlugin,
// so destructuring process.env will not work.
// eslint-disable-next-line prefer-destructuring
const SITE_KEY = process.env.TURNSTILE_SITE_KEY

let scriptPromise

const loadTurnstileScript = () => {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      const isLoaded =
        existing.readyState === 'complete' || existing.readyState === 'loaded'
      if (isLoaded) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', reject)
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = (error) => {
      scriptPromise = null
      reject(error)
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

const Turnstile = ({ onSuccess, onExpire, onError, className, theme }) => {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const onSuccessRef = useRef(onSuccess)
  const onExpireRef = useRef(onExpire)
  const onErrorRef = useRef(onError)

  onSuccessRef.current = onSuccess
  onExpireRef.current = onExpire
  onErrorRef.current = onError

  useEffect(() => {
    let cancelled = false

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return
      if (widgetIdRef.current != null) return

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        'sitekey': SITE_KEY,
        'theme': theme || 'light',
        'callback': (token) => {
          if (onSuccessRef.current) onSuccessRef.current(token)
        },
        'expired-callback': () => {
          if (onExpireRef.current) onExpireRef.current()
        },
        'error-callback': () => {
          if (onErrorRef.current) onErrorRef.current()
        },
      })
    }

    loadTurnstileScript()
      .then(() => {
        if (cancelled) return
        renderWidget()
      })
      .catch(() => {})

    return () => {
      cancelled = true
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [theme])

  return <div ref={containerRef} className={className} />
}

export default Turnstile
