import { useCallback } from 'react'
import { useCookies } from 'react-cookie'

import { cookies as cookiesContext } from 'data/cookies.yml'

const convertCookieValue = (value) => {
  let cookieValue = value
  if (['true', 'false'].includes(cookieValue))
    cookieValue = cookieValue === 'true'

  return cookieValue
}
export const useCookieItems = () => {
  const [cookies] = useCookies()
  return cookiesContext.map((cookie) => {
    // convert cookie to its boolean representation
    const cookieValue = convertCookieValue(cookies[cookie.name])

    return {
      ...cookie,
      value: cookieValue ?? cookie.default,
    }
  })
}

export const useCookie = (cookieName) => {
  const [cookies] = useCookies([cookieName])
  const cookieValue = convertCookieValue(cookies[cookieName])

  return (
    cookieValue ??
    cookiesContext.find(({ name }) => name === cookieName)?.default
  )
}

export const useCookieHandler = () => {
  const [, setCookie] = useCookies()
  const items = useCookieItems()

  return useCallback((event) => {
    event.preventDefault()

    let patch

    // assuming when user hit accept in popup form we accept all cookies
    if (event.target.id === 'cookies-popup')
      patch = items.filter((el) => !el.value).map(({ name }) => [name, true])
    else {
      const input = new FormData(event.target)
      patch = Array.from(input.entries(), ([name, value]) => [
        name,
        value === 'on',
      ])
    }

    patch.forEach(([cookieName, cookieValue]) => {
      setCookie(cookieName, cookieValue, {
        path: '/',
        maxAge: 1 * 365 * 24 * 60 * 60,
      })
    })
  }, items)
}
