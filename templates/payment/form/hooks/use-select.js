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

    // if id doesn't exists it means user type own text and didn't use suggestion
    // if (!data.id) {
    //   setSuggestions(
    //     options.slice(0, Math.max(0, options.length - data.value.length))
    //   )
    // }
    // setValue(data.value)
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
