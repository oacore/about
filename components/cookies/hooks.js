import { useCookies } from '@oacore/design'

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
