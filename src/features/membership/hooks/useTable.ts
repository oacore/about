'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export const useTable = () => {
  const [visibleTable, setVisibleTable] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visibleTable || !tableRef.current) return
    tableRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [visibleTable])

  const toggleVisibleTable = useCallback(() => {
    setVisibleTable((current) => !current)
  }, [])

  return { visibleTable, toggleVisibleTable, tableRef }
}
