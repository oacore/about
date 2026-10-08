const ROR_ID = /\((https:\/\/ror\.org\/[^)]+)\)$/

export const INSTITUTION_EMAIL_ERROR =
  'The email address you provided must belong to the institution you selected. Please use an institutional email address associated with this organisation. There might be legitimate reason for having a different email from your institution, if this is the case please contact us to request institutional access'

let universityDomainsCache = null
let universityDomainsPromise = null

export const getUniversityDomains = () => {
  if (universityDomainsCache) return Promise.resolve(universityDomainsCache)

  if (!universityDomainsPromise) {
    universityDomainsPromise = import('data/uni.json').then(
      ({ default: universities }) => {
        universityDomainsCache = new Set(
          universities.flatMap(({ domains = [] }) =>
            domains.map((domain) => domain.trim().toLowerCase()).filter(Boolean)
          )
        )

        return universityDomainsCache
      }
    )
  }

  return universityDomainsPromise
}

export const extractRorId = (organisationName) =>
  organisationName.trim().match(ROR_ID)?.[1] ?? null

const extractHostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./i, '').toLowerCase()
  } catch {
    return null
  }
}

const parseDomains = (organisation) => {
  if (!organisation) return []

  const fromDomains = (organisation.domains ?? [])
    .map((domain) => domain?.trim().toLowerCase())
    .filter(Boolean)

  if (fromDomains.length) return fromDomains

  return [
    ...new Set(
      (organisation.links ?? [])
        .filter((link) => link.type === 'website' && link.value)
        .map((link) => extractHostname(link.value))
        .filter(Boolean)
    ),
  ]
}

export const fetchOrganisationDomains = async (rorId) => {
  const response = await fetch(
    `https://api.ror.org/organizations/${encodeURIComponent(rorId)}`
  )

  if (!response.ok) throw new Error(`ROR API error: ${response.status}`)

  return parseDomains(await response.json())
}

export const validateInstitutionEmail = (
  email,
  allowedDomains,
  universityDomains
) => {
  const domain = email.trim().toLowerCase().split('@')[1]

  if (!domain) return INSTITUTION_EMAIL_ERROR

  if (universityDomains?.has(domain)) return ''

  if (allowedDomains.includes(domain)) return ''

  if (universityDomains === null) return ''

  return INSTITUTION_EMAIL_ERROR
}
