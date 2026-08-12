import { useState, useEffect } from 'react'

const stripSelectedRorId = (value) =>
  value.replace(/\s+\(https:\/\/ror\.org\/[^)]+\)$/, '').trim()

const useInput = (element, fetchSuggestions = false, defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (!fetchSuggestions) return

    const query = stripSelectedRorId(value)

    if (query.length < 2) {
      setSuggestions([])
      return
    }

    fetch(
      `https://api.ror.org/organizations?query=${encodeURIComponent(query)}`
    )
      .then((response) => {
        if (!response.ok) throw new Error(`ROR API error: ${response.status}`)

        return response.json()
      })
      .then((data) => {
        setSuggestions(data.items || [])
      })
      .catch((error) => {
        console.error('Error fetching suggestions:', error)
      })
  }, [fetchSuggestions, value])

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
