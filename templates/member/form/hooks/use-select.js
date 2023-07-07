import { useState } from 'react'

export const useSelect = (initialValue, initOptions, initError) => {
  const [value, setValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState(initOptions)
  const [isError, setIsError] = useState(initError)
  const handleOnChange = (data) => {
    setValue(data.value)
  }

  const handleOnInput = (data) => {
    if (data.value) {
      setValue(data.value)
      const result = initOptions.filter((option) =>
        Number.isInteger(data.value)
          ? option.name.toLowerCase().includes(data.value)
          : option.name.toLowerCase().includes(data.value.toLowerCase())
      )

      setSuggestions(result)
      // Set error code for wrong input
      const inputValue = data.value.toLowerCase().split(' ').join('_')
      let initValue = ''
      if (result[0] && result[0].name)
        initValue = result[0].name.toLowerCase().split(' ').join('_')

      if (inputValue === initValue) setIsError(false)
      else setIsError(true)
    }
    if (!data.value) setSuggestions(initOptions)
  }
  return {
    value,
    suggestions,
    handleOnInput,
    handleOnChange,
    setSuggestions,
    isError,
  }
}

export default useSelect
