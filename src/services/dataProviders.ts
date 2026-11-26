import { coreApiUrl } from '@config/api'

// Called straight from the browser like the old site (`${API_URL}/data-providers`)
const DATA_PROVIDERS_URL = coreApiUrl('/internal/data-providers')

export class DataProviderRequestError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'DataProviderRequestError'
    this.status = status
    this.body = body
  }
}

export type AddDataProviderInput = {
  uri: string
  email: string
}

export const addDataProvider = async ({ uri, email }: AddDataProviderInput): Promise<unknown> => {
  const response = await fetch(DATA_PROVIDERS_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // The old site sent the API's cookies with this request
    credentials: 'include',
    body: JSON.stringify({ uri: uri.trim(), email: email.trim() }),
  })

  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    throw new DataProviderRequestError(
      response.statusText || 'Request failed',
      response.status,
      payload,
    )
  }

  return payload
}
