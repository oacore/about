import type { DiagnosticCheckId, DiagnosticCheckStates } from './types'

/** [check id after YAML camelize, API field on health-check payload] */
const HEALTH_CHECK_ROWS: ReadonlyArray<readonly [DiagnosticCheckId, string]> = [
  ['oaiPmh', 'oaipmh_check'],
  ['oaiPmhUa', 'oaipmh_check_ua'],
  ['blockingHeaders', 'headers'],
  ['blockingHeadersUa', 'headers_ua'],
  ['robotsDisallow', 'robots.txt_disallow'],
  ['robotsCrawlDelay', 'robots.txt_crawl-delay'],
  ['robotsEssentialParts', 'robots.txt_pdf'],
]

export const diagnosticCheckIds = HEALTH_CHECK_ROWS.map(([id]) => id)

const pass = (value: unknown): boolean => value === true || value === 'true'

const unwrapPayload = (raw: unknown): Record<string, unknown> => {
  if (raw == null || typeof raw !== 'object' || Array.isArray(raw)) {
    return {}
  }

  const record = raw as Record<string, unknown>
  const body = record.data

  if (body != null && typeof body === 'object' && !Array.isArray(body)) {
    return body as Record<string, unknown>
  }

  return record
}

/** Maps POST /data-providers/health-check JSON to pass/fail by check id. */
const mapHealthCheckPayload = (raw: unknown): DiagnosticCheckStates => {
  const payload = unwrapPayload(raw)

  return Object.fromEntries(
    HEALTH_CHECK_ROWS.map(([id, key]) => [id, pass(payload[key])]),
  ) as DiagnosticCheckStates
}

export const areAllChecksPassing = (states: DiagnosticCheckStates): boolean =>
  diagnosticCheckIds.every((id: DiagnosticCheckId) => states[id])

export default mapHealthCheckPayload
