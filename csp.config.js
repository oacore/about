/*
 * Content-Security-Policy
 */
const SELF = "'self'"
// Note it needs to be like that because https://core.ac.uk
// is not covered by wildcard
const PRODUCTION = '*.core.ac.uk core.ac.uk'

const config = {
  'default-src': [SELF, PRODUCTION],
  'script-src': [SELF, '*.google-analytics.com'],
  // TODO: Move 'unsafe-inline' to development when the Next.js' bug is resolved
  // See more: https://github.com/vercel/next.js/issues/17445
  'style-src': [SELF, "'unsafe-inline'"],
  // - Google Analytics may transport data via image:
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#transport
  // - api.GitHub and raw.githubusercontent is for content load
  'img-src': [
    SELF,
    PRODUCTION,
    'data:',
    '*.google-analytics.com',
    'oacore.github.io',
  ],
  'connect-src': [
    SELF,
    PRODUCTION,
    'sentry.io',
    '*.google-analytics.com',
    'api.github.com:*',
    'raw.githubusercontent.com:*',
  ],
}

if (process.env.NODE_ENV !== 'production') {
  // Allow hot module replacement using inlined scripts and styles
  config['script-src'].push("'unsafe-inline'", "'unsafe-eval'")

  // Allow connection to the local hosts in development:
  // - local API is running on a different port
  // - `localhost` and `127.0.0.1` are not the same domain technically
  // config['connect-src'].push('localhost:* 127.0.0.1:*') // old config
  config['connect-src'].push('localhost:* 127.0.0.1:*')
}

const policy = Object.entries(config)
  .map(([directive, value]) => `${directive} ${value.join(' ')}`)
  .join(';')

module.exports = policy
