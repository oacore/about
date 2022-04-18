import { useState } from 'react'

export const useSelect = (elementType, initialValue, initOptions) => {
  const [value, setValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState(initOptions)
  const handleOnChange = (data) => {
    setValue(data.value)
  }

  const handleOnInput = (data) => {
    if (data.value) {
      const result = initOptions.filter((option) =>
        option.name.toLowerCase().includes(data.value.toLowerCase())
      )

      setSuggestions(result)
    }
    if (!data.value) setSuggestions(initOptions)
  }
  return {
    value,
    suggestions,
    handleOnInput,
    handleOnChange,
    setSuggestions,
  }
}

export default useSelect
