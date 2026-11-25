import { coreApiUrl } from '@config/api'

// Called straight from the browser like the old site; note this endpoint is outside /internal
const HEALTH_CHECK_URL = coreApiUrl('/data-providers/health-check')

type HealthCheckErrorBody = {
  message?: string
  error?: string
}

export class HealthCheckRequestError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'HealthCheckRequestError'
    this.status = status
    this.body = body
  }
}

const resolveErrorMessage = (payload: unknown, fallback: string): string => {
  if (payload == null || typeof payload !== 'object' || Array.isArray(payload)) {
    return fallback
  }

  const body = payload as HealthCheckErrorBody & { data?: HealthCheckErrorBody }
  const nested = body.data
  const message = nested?.message ?? nested?.error ?? body.message ?? body.error

  return typeof message === 'string' && message.trim() ? message : fallback
}

export const postDataProviderHealthCheck = async (baseUrl: string): Promise<unknown> => {
  const response = await fetch(HEALTH_CHECK_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ base_url: baseUrl }),
  })

  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    throw new HealthCheckRequestError(
      resolveErrorMessage(payload, response.statusText || 'Request failed'),
      response.status,
      payload,
    )
  }

  return payload
}

export const resolveHealthCheckErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof HealthCheckRequestError) {
    return error.message || fallback
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}
