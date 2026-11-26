export const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#') || url.startsWith('/')) {
    return url
  }

  return `/${url}`
}

export const getUniqueSectionId = (id: string | undefined, takenId?: string) => {
  if (!id) {
    return id
  }

  return id === takenId ? `${id}-download` : id
}
