import { useEffect, useState } from 'react'

import {
  extractRorId,
  fetchOrganisationDomains,
} from '../registration/helpers/validateInstitutionEmail'

const useOrganisationDomains = (organisationName, enabled) => {
  const rorId = enabled ? extractRorId(organisationName) : null
  const [domains, setDomains] = useState([])
  const [prevRorId, setPrevRorId] = useState(rorId)

  if (rorId !== prevRorId) {
    setPrevRorId(rorId)
    if (!rorId) setDomains([])
  }

  useEffect(() => {
    if (!rorId) return undefined

    let cancelled = false

    fetchOrganisationDomains(rorId)
      .then((nextDomains) => {
        if (!cancelled) setDomains(nextDomains)
      })
      .catch(() => {
        if (!cancelled) setDomains([])
      })

    return () => {
      cancelled = true
    }
  }, [rorId])

  return domains
}

export default useOrganisationDomains
