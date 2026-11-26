import envConfig from '../../env.config.js'

export const API_URL = process.env.API_URL || envConfig.API_URL

export const TURNSTILE_SITE_KEY = envConfig.TURNSTILE_SITE_KEY
