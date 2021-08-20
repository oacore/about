import { useState } from 'react'

const useSelect = () => {
  const [value, setValue] = useState()

  return {
    value,
    setValue,
    onChange: (data) => {
      setValue(data)
    },
  }
}

export default useSelect
