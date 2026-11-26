import retrieveContent from './retrieveContent'

import { rewriteAssetPaths } from './assets'

export { ASSETS_BASE_URL, isContentAssetPath, toContentAssetUrl } from './assets'

export const SITE_BASE_URL = process.env.SITE_BASE_URL ?? 'https://core.ac.uk'

const rewriteAssetStrings = (input: unknown): void => {
  if (input == null) return

  if (Array.isArray(input)) {
    input.forEach(rewriteAssetStrings)
    return
  }

  if (typeof input !== 'object') return

  const record = input as Record<string, unknown>

  for (const [key, value] of Object.entries(record)) {
    if (typeof value === 'string') {
      record[key] = rewriteAssetPaths(value)
      continue
    }

    rewriteAssetStrings(value)
  }
}

const loadContent = async (path: string): Promise<Record<string, unknown>> => {
  const page = (await retrieveContent(path)) as Record<string, unknown>

  if (!page || typeof page !== 'object' || Array.isArray(page)) {
    throw new Error(`Invalid content payload for "${path}"`)
  }

  rewriteAssetStrings(page)

  return page
}

export const getSections = (contentType: string): Promise<Record<string, unknown>> =>
  loadContent(contentType)

export const getMarkdownPage = (path: string): Promise<Record<string, unknown>> => loadContent(path)
