'use client'

import { useCallback, type KeyboardEvent, type MouseEvent } from 'react'

export const useSectionScroll = () => {
  const handleScroll = useCallback((id: string) => {
    const element = document.getElementById(id)

    if (!element) {
      return
    }

    window.history.pushState(null, '', `#${id}`)
    element.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleAnchorClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    handleScroll(id)
  }

  const handleAnchorKeyDown =
    (id: string) => (event: KeyboardEvent<HTMLAnchorElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return
      }

      event.preventDefault()
      handleScroll(id)
    }

  return { handleScroll, handleAnchorClick, handleAnchorKeyDown }
}
