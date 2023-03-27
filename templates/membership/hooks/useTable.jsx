import React, { useRef, useEffect } from 'react'

const useTable = () => {
  const [visibleTable, setVisibleTable] = React.useState(false)
  const tableRef = useRef(null)

  useEffect(() => {
    if (visibleTable && tableRef.current)
      tableRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [visibleTable])

  const toggleVisibleTable = () => {
    setVisibleTable(!visibleTable)
  }

  return { visibleTable, toggleVisibleTable, tableRef }
}

export default useTable
