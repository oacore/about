import { useState } from 'react'

const useSelect = (element) => {
  const [value, setValue] = useState('')

  return {
    value,
    element,
    onChange: (data) => {
      setValue(data)
    },
  }
}

export default useSelect
