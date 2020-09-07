import Cookies from 'js-cookie'

class CookiesManager {
  constructor(config) {
    this.config = config
    this.eventListeners = new Map()
  }

  get(name) {
    if (name == null) {
      const result = {}
      Object.keys(this.config).forEach((key) => {
        result[key] = this.get(key)
      })
      return result
    }

    if (!(name in this.config)) return undefined

    const actualName = this.config[name]
    return Cookies.getJSON(actualName)
  }

  set(name, value, options) {
    if (!(name in this.config)) return

    const actualName = this.config[name]
    const actualOptions = {
      expires: 365,
      ...options,
    }
    Cookies.set(actualName, value, actualOptions)
    this.dispatch('set', { [name]: value })
  }

  dispatch(eventName, value) {
    if (!this.eventListeners.has(eventName)) return
    this.eventListeners.get(eventName).forEach((l) => l.call(null, value))
  }

  addEventListener(eventName, listener) {
    if (typeof listener != 'function') return
    if (!this.eventListeners.has(eventName))
      this.eventListeners.set(eventName, [])
    this.eventListeners.get(eventName).push(listener)

    if (eventName === 'init' && typeof document != 'undefined')
      listener.call(null, this.get())
  }
}

const cookiesManager = new CookiesManager({
  essential: 'cookies_accepted',
  analytics: 'analytics_allowed',
})

const handleCookiesChange = (configDiff) => {
  Object.entries(configDiff).forEach(([key]) => {
    switch (key) {
      case 'essential':
        break
      case 'analytics':
        break
      default:
    }
  })
}

cookiesManager.addEventListener('set', handleCookiesChange)
cookiesManager.addEventListener('init', handleCookiesChange)

export default cookiesManager
