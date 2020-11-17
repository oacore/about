import { useCallback, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

import { cookies as cookiesContext } from 'data/cookies.yml'

const cookies = new Cookies()
const COOKIE_NAMES = ['cookies_accepted', 'analytics_allowed']

export const useCookies = (names = []) => {
  const [values, setValues] = useState(names.map(() => undefined))

  useEffect(() => {
    setValues(names.map((name) => cookies.get(name)))
  }, [typeof document == 'object' ? document.cookie : '', names.join(',')])

  const setCookie = useCallback(cookies.set.bind(cookies), [cookies])
  const removeCookie = useCallback(cookies.remove.bind(cookies), [cookies])

  return [...values, setCookie, removeCookie]
}

export const useCookieItems = () => {
  const values = useCookies(COOKIE_NAMES)
  return COOKIE_NAMES.map((name, i) => ({
    ...Object.values(cookiesContext).find((config) => name === config.name),
    value: values[i] == null ? values[i] : values[i] === 'true',
  }))
}

export const useCookieHandler = ({ patchDefaults = false } = {}) => {
  const items = useCookieItems()
  const [setCookie] = useCookies()

  const updateCookies = useCallback(
    (event) => {
      event.preventDefault()

      const input = new FormData(event.target)
      const patch = Object.fromEntries(
        Array.from(input.entries(), ([name, value]) => [name, value === 'on'])
      )
      items.forEach(({ name, default: defaultValue }) => {
        const fallbackValue =
          typeof defaultValue == 'undefined' ? false : defaultValue
        const value = patchDefaults
          ? patch[name] ?? fallbackValue
          : !!patch[name]

        setCookie(name, value, {
          path: '/',
          maxAge: 1 * 365 * 24 * 60 * 60,
        })
      })
    },
    [items, setCookie]
  )

  return updateCookies
}

export default {
  useCookieHandler,
  useCookieItems,
  useCookies,
}
