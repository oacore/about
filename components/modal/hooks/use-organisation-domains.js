import { useEffect, useState } from 'react'

import {
  extractRorId,
  getOrganisationDomains,
} from '../registration/helpers/validateInstitutionEmail'

const useOrganisationDomains = (organisationName, enabled) => {
  const [domains, setDomains] = useState([])

  useEffect(() => {
    if (!enabled) {
      setDomains([])
      return undefined
    }

    const rorId = extractRorId(organisationName.trim())

    if (!rorId) {
      setDomains([])
      return undefined
    }

    let isCancelled = false

    fetch(`https://api.ror.org/organizations/${encodeURIComponent(rorId)}`)
      .then((response) => {
        if (!response.ok) throw new Error(`ROR API error: ${response.status}`)

        return response.json()
      })
      .then((data) => {
        if (!isCancelled) setDomains(getOrganisationDomains(data))
      })
      .catch(() => {
        if (!isCancelled) setDomains([])
      })

    return () => {
      isCancelled = true
    }
  }, [organisationName, enabled])

  return domains
}

export default useOrganisationDomains
