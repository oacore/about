import { useState, useEffect } from 'react'

const stripSelectedRorId = (value) =>
  value.replace(/\s+\(https:\/\/ror\.org\/[^)]+\)$/, '').trim()

const useInput = (element, fetchSuggestions = false, defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)
  const [suggestions, setSuggestions] = useState([])
  const query = stripSelectedRorId(value)
  const canSearch = Boolean(fetchSuggestions) && query.length >= 2
  const [prevCanSearch, setPrevCanSearch] = useState(canSearch)

  if (canSearch !== prevCanSearch) {
    setPrevCanSearch(canSearch)
    if (!canSearch) setSuggestions([])
  }

  useEffect(() => {
    if (!canSearch) return undefined

    let cancelled = false

    fetch(
      `https://api.ror.org/organizations?query=${encodeURIComponent(query)}`
    )
      .then((response) => {
        if (!response.ok) throw new Error(`ROR API error: ${response.status}`)

        return response.json()
      })
      .then((data) => {
        if (!cancelled) setSuggestions(data.items || [])
      })
      .catch((error) => {
        if (!cancelled) console.error('Error fetching suggestions:', error)
      })

    return () => {
      cancelled = true
    }
  }, [canSearch, query])

  return {
    value,
    element,
    suggestions,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value)
      },
    },
  }
}

export default useInput
