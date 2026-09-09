import { useEffect, useState } from 'react'

import { getUniversityDomains } from '../registration/helpers/validateInstitutionEmail'

const useUniversityDomains = (enabled) => {
  const [domains, setDomains] = useState(null)

  useEffect(() => {
    if (!enabled) {
      setDomains(null)
      return undefined
    }

    let cancelled = false

    getUniversityDomains()
      .then((nextDomains) => {
        if (!cancelled) setDomains(nextDomains)
      })
      .catch(() => {
        if (!cancelled) setDomains(new Set())
      })

    return () => {
      cancelled = true
    }
  }, [enabled])

  return domains
}

export default useUniversityDomains
