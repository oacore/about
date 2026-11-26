import type {
  MembershipPricePayload,
  MembershipPriceResponse,
  MembershipRequestPayload,
  MembershipTypeRepositoryResponse,
  RepositoryOption,
} from '@features/member/types'
import { coreApiUrl } from '@config/api'

// Called straight from the browser, like the old about repo (api/services.js, store/data-providers.js)
const MEMBERSHIP_URL = coreApiUrl('/internal/membership')
const MEMBERSHIP_TYPE_REPOSITORY_URL = coreApiUrl('/internal/membership/type-repository')
const MEMBERSHIP_PRICE_URL = coreApiUrl('/internal/membership/price')
export const REPOSITORIES_FORMAP_URL = coreApiUrl('/internal/repositories/formap')

class MembershipRequestError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'MembershipRequestError'
    this.status = status
    this.body = body
  }
}

const resolveErrorMessage = (payload: unknown, fallback: string): string => {
  if (payload == null || typeof payload !== 'object' || Array.isArray(payload)) {
    return fallback
  }

  const body = payload as { message?: string; error?: string; data?: { message?: string; error?: string } }
  const message = body.data?.message ?? body.data?.error ?? body.message ?? body.error

  return typeof message === 'string' && message.trim() ? message : fallback
}

const postJson = async <T>(url: string, body: unknown): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })

  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    throw new MembershipRequestError(
      resolveErrorMessage(payload, response.statusText || 'Request failed'),
      response.status,
      payload,
    )
  }

  return unwrapData<T>(payload)
}

const unwrapData = <T>(payload: unknown): T => {
  if (payload != null && typeof payload === 'object' && !Array.isArray(payload) && 'data' in payload) {
    return (payload as { data: T }).data
  }

  return payload as T
}

const isRepositoryOption = (value: unknown): value is RepositoryOption => {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  const item = value as { id?: unknown; name?: unknown }
  return (typeof item.id === 'number' || typeof item.id === 'string') && typeof item.name === 'string'
}

export const fetchRepositoriesFormap = async (): Promise<RepositoryOption[]> => {
  const response = await fetch(REPOSITORIES_FORMAP_URL, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
  })

  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    throw new MembershipRequestError(
      resolveErrorMessage(payload, response.statusText || 'Request failed'),
      response.status,
      payload,
    )
  }

  const list = Array.isArray(payload)
    ? payload
    : payload != null && typeof payload === 'object' && 'data' in payload && Array.isArray((payload as { data: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : []

  return list.filter(isRepositoryOption)
}

export const checkMembershipTypeRepository = (
  body: MembershipRequestPayload,
): Promise<MembershipTypeRepositoryResponse> =>
  postJson<MembershipTypeRepositoryResponse>(MEMBERSHIP_TYPE_REPOSITORY_URL, body)

export const createMembershipPayment = (body: MembershipRequestPayload): Promise<unknown> =>
  postJson(MEMBERSHIP_URL, body)

export const getMembershipPrice = (body: MembershipPricePayload): Promise<MembershipPriceResponse> =>
  postJson<MembershipPriceResponse>(MEMBERSHIP_PRICE_URL, body)
