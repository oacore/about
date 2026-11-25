export type OutreachMaterialOption = {
  title: string
  value: string
}

export type OutreachMaterial = {
  id: string
  name: string
  type?: string
  url?: string
  picture?: string
  label?: string
  itemName?: string
  options?: OutreachMaterialOption[]
  action?: string
  actionHref?: string
}

export const FORMAT_LABELS: Record<string, string> = {
  jpg: 'JPEG',
  jpeg: 'JPEG',
  png: 'PNG',
  pdf: 'PDF',
  gdoc: 'Google Doc',
  gslides: 'Google Slides',
  page: 'page',
}

const OPEN_FORMATS = new Set(['gdoc', 'gslides', 'pdf', 'page'])

export const getFormatLabel = (format?: string): string => {
  if (!format) {
    return ''
  }

  return FORMAT_LABELS[format] ?? format.toUpperCase()
}

export const getFormatAction = (format?: string): 'Open' | 'Download' => {
  if (!format) {
    return 'Open'
  }

  return OPEN_FORMATS.has(format) ? 'Open' : 'Download'
}

export const resolveHref = (url?: string): string | undefined => {
  if (!url) {
    return undefined
  }

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

export const downloadFile = async (url: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = decodeURIComponent(url.split('/').pop() || 'download')
  link.click()
  URL.revokeObjectURL(objectUrl)
}

export const hasResourceAction = (resource: OutreachMaterial): boolean => Boolean(resource.action)
