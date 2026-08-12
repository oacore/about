const ROR_ID_PATTERN = /\((https:\/\/ror\.org\/[^)]+)\)$/

export const INSTITUTION_EMAIL_ERROR =
  'The email address you provided must belong to the institution you selected. Please use an institutional email address associated with this organisation.'

export const extractRorId = (organisationName) =>
  organisationName.match(ROR_ID_PATTERN)?.[1] || null

export const getOrganisationDomains = (organisation) => {
  if (!organisation) return []

  if (organisation.domains?.length)
    return organisation.domains.map((domain) => domain.toLowerCase())

  return [
    ...new Set(
      (organisation.links || [])
        .filter((link) => link.type === 'website' && link.value)
        .map((link) => {
          try {
            return new URL(link.value).hostname
              .toLowerCase()
              .replace(/^www\./, '')
          } catch {
            return null
          }
        })
        .filter(Boolean)
    ),
  ]
}

export const validateInstitutionEmail = (email, allowedDomains) => {
  if (!allowedDomains?.length) return null

  const domain = email.trim().toLowerCase().split('@')[1]

  if (!domain || !allowedDomains.includes(domain))
    return INSTITUTION_EMAIL_ERROR

  return null
}
