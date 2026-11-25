'use client'

import { useEffect } from 'react'

const NotFoundTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return null
}

export default NotFoundTitle
