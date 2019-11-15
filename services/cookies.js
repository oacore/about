import Cookies from 'js-cookie'

class CookiesManager {
  constructor(config) {
    this.config = config
    this.eventListeners = new Map()
  }

  get(name, defaultValue) {
    if (name == null) {
      const result = {}
      Object.keys(this.config).forEach(key => {
        result[key] = this.get(key)
      })
      return result
    }

    if (!(name in this.config)) return undefined

    const [actualName, initialValue] = this.config[name]
    const value = Cookies.getJSON(actualName)
    const fallbackValue =
      typeof defaultValue != 'undefined' ? defaultValue : initialValue
    return typeof value == 'undefined' ? fallbackValue : value
  }

  set(name, value, options) {
    if (!(name in this.config)) return

    const [actualName] = this.config[name]
    const actualOptions = {
      expires: 365,
      ...options,
    }
    Cookies.set(actualName, value, actualOptions)
    this.dispatch('set', { [name]: value })
  }

  dispatch(eventName, value) {
    if (!this.eventListeners.has(eventName)) return
    this.eventListeners.get(eventName).forEach(l => l.call(null, value))
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
  essential: ['cookies_accepted', true],
  analytics: ['analytics_allowed', true],
})

const toggleAnalytics = enabled => {
  const analyticsSrc = '/js/ga.js'
  if (enabled) {
    const script = document.createElement('script')
    script.src = analyticsSrc
    document.body.append(script)
  } else {
    const selector = `script[src="${analyticsSrc}"]`
    const script = document.body.querySelector(selector)
    if (script) script.remove()
  }
}

const handleCookiesChange = configDiff => {
  // Enable analytics by default
  if (configDiff.essential == null) toggleAnalytics(true)

  Object.entries(configDiff).forEach(([key, value]) => {
    switch (key) {
      case 'essential':
        break
      case 'analytics':
        toggleAnalytics(value)
        break
      default:
    }
  })
}

cookiesManager.addEventListener('set', handleCookiesChange)
cookiesManager.addEventListener('init', handleCookiesChange)

export default cookiesManager
