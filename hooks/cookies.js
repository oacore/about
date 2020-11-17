import { useCallback } from 'react'
import { useCookies } from 'react-cookie'

import { cookies as cookiesContext } from 'data/cookies.yml'

export const useCookieItems = () => {
  const [cookies] = useCookies()
  return cookiesContext.map((cookie) => {
    // convert cookie to its boolean representation
    let cookieValue = cookies[cookie.name]
    if (['true', 'false'].includes(cookieValue))
      cookieValue = cookieValue === 'true'

    return {
      ...cookie,
      value: cookieValue ?? cookie.default,
    }
  })
}

export const useCookie = (cookieName) => {
  const [cookies] = useCookies([cookieName])
  return (
    cookies[cookieName.name] ??
    cookiesContext.find(({ name }) => name === cookieName)?.default
  )
}

export const useCookieHandler = () => {
  const [, setCookie] = useCookies()

  return useCallback((event) => {
    event.preventDefault()

    const input = new FormData(event.target)
    const patch = Array.from(input.entries(), ([name, value]) => [
      name,
      value === 'on',
    ])

    patch.forEach(([cookieName, cookieValue]) => {
      setCookie(cookieName, cookieValue, {
        path: '/',
        maxAge: 1 * 365 * 24 * 60 * 60,
      })
    })
  }, [])
}
