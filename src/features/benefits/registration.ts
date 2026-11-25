import { DataProviderRequestError } from '@services/dataProviders'

export type ExistingDataProvider = {
  id: number | string
  name?: string
  enabled?: boolean
}

export type RegistrationOutcome =
  | { kind: 'created' }
  | { kind: 'exists'; providerId?: string }
  | { kind: 'issue' }

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value != null && typeof value === 'object' && !Array.isArray(value)

const parseJsonRecord = (value: unknown): Record<string, unknown> | null => {
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(value)
    return isRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}

const isExistingProvider = (value: unknown): value is ExistingDataProvider => {
  if (!isRecord(value)) {
    return false
  }

  return typeof value.id === 'number' || typeof value.id === 'string'
}

const readProviders = (value: unknown): ExistingDataProvider[] => {
  if (!isRecord(value) || !Array.isArray(value.existingDataProviders)) {
    return []
  }

  return value.existingDataProviders.filter(isExistingProvider)
}

export const extractExistingProviders = (payload: unknown): ExistingDataProvider[] => {
  if (!isRecord(payload)) {
    return []
  }

  const direct = readProviders(payload)
  if (direct.length) {
    return direct
  }

  const nested = readProviders(payload.data)
  if (nested.length) {
    return nested
  }

  const fromMessage = readProviders(parseJsonRecord(payload.message))
  if (fromMessage.length) {
    return fromMessage
  }

  const dataRecord = isRecord(payload.data) ? payload.data : null
  return readProviders(parseJsonRecord(dataRecord?.message))
}

export const resolveProviderId = (providers: ExistingDataProvider[]): string | undefined => {
  const enabledIds = providers
    .filter((provider) => provider.enabled === true)
    .map((provider) => String(provider.id))
  const ids = enabledIds.length ? enabledIds : providers.map((provider) => String(provider.id))
  const providerId = ids.filter(Boolean).join(', ')

  return providerId || undefined
}

const toExistsOutcome = (providers: ExistingDataProvider[]): RegistrationOutcome => ({
  kind: 'exists',
  providerId: resolveProviderId(providers),
})

/** A 2xx registration is the new-provider step unless the body already lists providers. */
export const classifySuccess = (payload: unknown): RegistrationOutcome => {
  const providers = extractExistingProviders(payload)
  if (providers.length) {
    return toExistsOutcome(providers)
  }

  return { kind: 'created' }
}

export const classifyFailure = (error: unknown): RegistrationOutcome => {
  if (!(error instanceof DataProviderRequestError)) {
    return { kind: 'issue' }
  }

  const providers = extractExistingProviders(error.body)
  if (providers.length || error.status === 409) {
    return toExistsOutcome(providers)
  }

  return { kind: 'issue' }
}

export const buildExistsDescription = (providerId?: string): string => {
  const location = providerId
    ? `You can find data provider’s content at [CORE search](/search?q=${encodeURIComponent(`dataProviders:${providerId}`)}). Also here you can find data provider [data provider profile](/data-providers/${encodeURIComponent(providerId)}) page on the CORE website.`
    : 'This data provider is already part of CORE.'

  return `${location}<br/><br/>
**Please note**, that if you have submitted this repository recently it may not appear on the search results. Please wait until indexing will be completed. [Find out more](/documentation/data-providers-guide#indexing).`
}
