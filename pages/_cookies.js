import { cookies as cookiesContext } from 'data/cookies.yml'
import { cookies } from '../services'

export const isCookiesAccepted = () => cookies.get('essential', null) !== null

export const getCookiesContext = () =>
  Object.entries(cookies.get()).reduce((cookieItems, [key, value]) => {
    cookieItems[key] = {
      ...cookiesContext[key],
      value,
    }
    return cookieItems
  }, {})

export const handleCookiesUpdate = event => {
  event.preventDefault()

  const cookieItems = getCookiesContext()
  const cookiesUpdate = new FormData(event.target)
  Object.entries(cookieItems).forEach(
    ([cookieName, { default: defaultValue }]) => {
      let value = typeof defaultValue == 'undefined' ? false : defaultValue
      if (cookiesUpdate.has(cookieName))
        value = cookiesUpdate.get(cookieName) === 'on'

      cookies.set(cookieName, value)
    }
  )

  window.location.reload()
}
