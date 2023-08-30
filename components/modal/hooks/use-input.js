import { useState, useEffect } from 'react'

const useInput = (element, fetchSuggestions = false) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (fetchSuggestions) {
      fetch(`https://api.ror.org/organizations?query=${value}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.items)
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error)
        })
    }
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
