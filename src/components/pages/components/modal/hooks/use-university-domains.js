import { useEffect, useState } from 'react'

import { getUniversityDomains } from '../registration/helpers/validateInstitutionEmail'

const useUniversityDomains = (enabled) => {
  const [domains, setDomains] = useState(null)
  const [prevEnabled, setPrevEnabled] = useState(enabled)

  if (enabled !== prevEnabled) {
    setPrevEnabled(enabled)
    if (!enabled) setDomains(null)
  }

  useEffect(() => {
    if (!enabled) return undefined

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
