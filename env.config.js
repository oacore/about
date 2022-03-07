const NODE_ENV = process.env.NODE_ENV || 'development'

const local = {
  API_URL: 'http://127.0.0.1:8000/internal',
  DOMAIN: 'http://localhost:3000',
}

const development = {
  API_URL: 'https://api-dev.core.ac.uk/internal',
  DOMAIN: 'https://core.ac.uk',
}

const production = {
  API_URL: 'https://api.core.ac.uk/internal',
  DOMAIN: 'https://core.ac.uk',
}

const env = { local, development, production }
const config = {
  ...env.production,
  ...env[NODE_ENV],
}

module.exports = config
