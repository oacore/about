'use client'

import { useEffect, useRef } from 'react'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

type TurnstileRenderOptions = {
  sitekey: string
  theme?: 'light' | 'dark' | 'auto'
  action?: string
  callback?: (token: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string
      remove: (widgetId: string) => void
    }
  }
}

let scriptPromise: Promise<void> | null = null

const loadTurnstileScript = (): Promise<void> => {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  if (window.turnstile) {
    return Promise.resolve()
  }

  if (scriptPromise) {
    return scriptPromise
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)

    if (existing) {
      const readyState = (existing as HTMLScriptElement & { readyState?: string }).readyState

      if (readyState === 'complete' || readyState === 'loaded' || window.turnstile) {
        resolve()
        return
      }

      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')))
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('Turnstile failed to load'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

type TurnstileProps = {
  siteKey?: string
  onSuccess?: (token: string) => void
  onExpire?: () => void
  onError?: () => void
  className?: string
  theme?: 'light' | 'dark' | 'auto'
  action?: string
}

const Turnstile = ({
  siteKey,
  onSuccess,
  onExpire,
  onError,
  className,
  theme,
  action,
}: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onSuccessRef = useRef(onSuccess)
  const onExpireRef = useRef(onExpire)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onSuccessRef.current = onSuccess
    onExpireRef.current = onExpire
    onErrorRef.current = onError
  }, [onError, onExpire, onSuccess])

  useEffect(() => {
    if (!siteKey) {
      return undefined
    }

    let cancelled = false

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current != null) {
        return
      }

      const options: TurnstileRenderOptions = {
        sitekey: siteKey,
        theme: theme || 'light',
        callback: (token) => {
          onSuccessRef.current?.(token)
        },
        'expired-callback': () => {
          onExpireRef.current?.()
        },
        'error-callback': () => {
          onErrorRef.current?.()
        },
      }

      if (action) {
        options.action = action
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, options)
    }

    loadTurnstileScript()
      .then(() => {
        if (!cancelled) {
          renderWidget()
        }
      })
      .catch(() => undefined)

    return () => {
      cancelled = true

      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [action, siteKey, theme])

  if (!siteKey) {
    return null
  }

  return <div className={className} ref={containerRef} />
}

export default Turnstile
