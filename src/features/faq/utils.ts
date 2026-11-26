export const resolveActionHref = (url: string): string => {
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('#') ||
    url.startsWith('/')
  ) {
    return url
  }

  return `/${url}`
}

export const resolveExternalTarget = (url?: string): string | undefined =>
  url?.startsWith('http') ? '_blank' : undefined

export const updateLocationHash = (id: string, isOpen: boolean) => {
  const url = new URL(window.location.href)
  url.hash = isOpen ? id : ''
  window.history.replaceState({}, '', url.toString())
}

