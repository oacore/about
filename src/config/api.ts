import { API_URL } from '@config/env'

/**
 * CORE API URL for the current environment, built like the old about repo
 * (`new URL(path, process.env.API_URL)`): API_URL comes from APP_ENV
 * (api-dev / api-stg / api.core.ac.uk), and an absolute `path` replaces its `/internal` part.
 *
 *   coreApiUrl('/internal/membership')          → https://api-dev.core.ac.uk/internal/membership
 *   coreApiUrl('/data-providers/health-check')  → https://api-dev.core.ac.uk/data-providers/health-check
 */
export const coreApiUrl = (path: string): string => new URL(path, API_URL).toString()
