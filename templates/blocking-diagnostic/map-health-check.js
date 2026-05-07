const pass = (v) => v === true || v === 'true'

/** [check id in diagnostic.yml, API field on health-check payload] */
const ROWS = [
  ['oaiPmh', 'oaipmh_check'],
  ['oaiPmh_ua', 'oaipmh_check_ua'],
  ['blockingHeaders', 'headers'],
  ['blockingHeaders_ua', 'headers_ua'],
  ['robotsDisallow', 'robots.txt_disallow'],
  ['robotsCrawlDelay', 'robots.txt_crawl-delay'],
  ['robotsEssentialParts', 'robots.txt_pdf'],
]

export const diagnosticCheckIds = ROWS.map(([id]) => id)

function unwrapPayload(raw) {
  const body = raw?.data
  if (body != null && typeof body === 'object' && !Array.isArray(body))
    return body

  if (raw != null && typeof raw === 'object' && !Array.isArray(raw)) return raw

  return {}
}

/** Maps POST /data-providers/health-check JSON to pass/fail by check id. */
export default function mapHealthCheckPayload(raw) {
  const p = unwrapPayload(raw)
  return Object.fromEntries(ROWS.map(([id, key]) => [id, pass(p[key])]))
}
