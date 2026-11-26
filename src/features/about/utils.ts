import type { AboutRelatedSection } from './types'

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

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

export const resolveExternalTarget = (url?: string): string | undefined =>
  url?.startsWith('http') ? '_blank' : undefined

export const getRelatedActionHref = (
  section: AboutRelatedSection | undefined,
  fallback: string,
): string | undefined => resolveHref(section?.href ?? fallback)
