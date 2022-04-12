import React from 'react'

const useTable = () => {
  const [visibleTable, setVisibleTable] = React.useState(false)

  const toggleVisibleTable = React.useCallback(() => {
    setVisibleTable(!visibleTable)
  })
  return { visibleTable, toggleVisibleTable }
}

export default useTable
