'use client'

import Cookies from 'js-cookie'
import { useCallback, useSyncExternalStore, type FormEvent, type MouseEvent } from 'react'

const COOKIE_MAX_AGE_DAYS = 365

const cookieAttributes = {
  path: '/',
  expires: COOKIE_MAX_AGE_DAYS,
} as const

type CookieDefinition = {
  id: string
  name: string
  default: boolean
  required: boolean
  title: string
  description: string
}

export type CookieItem = CookieDefinition & {
  value: boolean
}

const cookiesContext = [
  {
    id: 'essential',
    name: 'essential_cookies_allowed',
    default: false,
    required: true,
    title: 'Essential cookies only',
    description:
      '**Required** to make the site work, and to save the options you make here',
  },
  {
    id: 'analytics',
    name: 'analytics_cookies_allowed',
    default: false,
    required: false,
    title: 'Analytics allowed',
    description:
      'Lets us (anonymously) track site usage, so that we can measure performance and make improvements',
  },
] as const satisfies readonly CookieDefinition[]

export type CookieName = (typeof cookiesContext)[number]['name']

type CookieSnapshot = Partial<Record<CookieName, string>>

type CookieConsentEvent = FormEvent<HTMLElement> | MouseEvent<HTMLElement>

const serverSnapshot: CookieSnapshot = {}

let clientSnapshot: CookieSnapshot | null = null

const listeners = new Set<() => void>()

const readSnapshot = (): CookieSnapshot => {
  return cookiesContext.reduce<CookieSnapshot>((snapshot, cookie) => {
    const value = Cookies.get(cookie.name)

    if (value) {
      snapshot[cookie.name] = value
    }

    return snapshot
  }, {})
}

const getCookieSnapshot = () => {
  if (!clientSnapshot) {
    clientSnapshot = readSnapshot()
  }

  return clientSnapshot
}

const getServerCookieSnapshot = () => serverSnapshot

const subscribeToCookies = (listener: () => void) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

const publishCookieChange = () => {
  clientSnapshot = readSnapshot()
  listeners.forEach((listener) => {
    listener()
  })
}

const resolveCookieValue = (rawValue: string | undefined, fallback: boolean): boolean => {
  if (rawValue === 'true') {
    return true
  }

  if (rawValue === 'false') {
    return false
  }

  return fallback
}

const useCookieSnapshot = () => {
  return useSyncExternalStore(subscribeToCookies, getCookieSnapshot, getServerCookieSnapshot)
}

export const useCookieItems = (): CookieItem[] => {
  const snapshot = useCookieSnapshot()

  return cookiesContext.map((cookie) => ({
    ...cookie,
    value: resolveCookieValue(snapshot[cookie.name], cookie.default),
  }))
}

export const useCookie = (cookieName: CookieName): boolean => {
  const snapshot = useCookieSnapshot()
  const cookie = cookiesContext.find(({ name }) => name === cookieName)

  return resolveCookieValue(snapshot[cookieName], cookie?.default ?? false)
}

export const useCookieHandler = () => {
  const handleCookieConsent = useCallback((event: CookieConsentEvent) => {
    event.preventDefault()

    const selectedNames = event.currentTarget.id.split(',').filter(Boolean)

    cookiesContext.forEach(({ name }) => {
      Cookies.remove(name, { path: cookieAttributes.path })
    })

    cookiesContext
      .filter(({ name }) => selectedNames.includes(name))
      .forEach(({ name }) => {
        Cookies.set(name, 'true', cookieAttributes)
      })

    publishCookieChange()
  }, [])

  return handleCookieConsent
}
