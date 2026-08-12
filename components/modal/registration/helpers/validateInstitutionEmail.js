const ROR_ID = /\((https:\/\/ror\.org\/[^)]+)\)$/

export const INSTITUTION_EMAIL_ERROR =
  'The email address you provided must belong to the institution you selected. Please use an institutional email address associated with this organisation.'

export const extractRorId = (organisationName) =>
  organisationName.trim().match(ROR_ID)?.[1] ?? null

const parseDomains = (organisation) => {
  if (organisation?.domains?.length)
    return organisation.domains.map((domain) => domain.toLowerCase())

  return [
    ...new Set(
      (organisation?.links ?? [])
        .filter((link) => link.type === 'website' && link.value)
        .flatMap((link) => {
          try {
            return [
              new URL(link.value).hostname.replace(/^www\./i, '').toLowerCase(),
            ]
          } catch {
            return []
          }
        })
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

export const validateInstitutionEmail = (email, allowedDomains) => {
  if (!allowedDomains.length) return ''

  const domain = email.trim().toLowerCase().split('@')[1]

  return domain && allowedDomains.includes(domain)
    ? ''
    : INSTITUTION_EMAIL_ERROR
}
