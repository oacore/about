import { useEffect, useState } from 'react'

import {
  extractRorId,
  fetchOrganisationDomains,
} from '../registration/helpers/validateInstitutionEmail'

const useOrganisationDomains = (organisationName, enabled) => {
  const [domains, setDomains] = useState([])

  useEffect(() => {
    const rorId = enabled ? extractRorId(organisationName) : null

    if (!rorId) {
      setDomains([])
      return undefined
    }

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
  }, [organisationName, enabled])

  return domains
}

export default useOrganisationDomains
