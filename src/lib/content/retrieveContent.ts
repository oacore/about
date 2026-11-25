import matter from 'front-matter'
import { basename, extname } from 'path/posix'
import { parseAllDocuments } from 'yaml'

import { deepCamelize } from './camelize'
import { getPreviewRef } from './previewRef'

export type RetrieveContentOptions = {
  ref?: string
}

type PublicTreeItem = {
  path?: string
  contentType?: string
}

const getRepo = (ref?: string): { owner: string; repo: string; ref: string } => ({
  owner: process.env.GITHUB_CONTENT_OWNER ?? 'oacore',
  repo: process.env.GITHUB_CONTENT_REPO ?? 'content',
  ref: ref ?? process.env.GITHUB_CONTENT_REF ?? 'main',
})

const rawContentUrl = (filePath: string, ref: string): string => {
  const repo = getRepo(ref)
  return `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/${repo.ref}/${filePath}`
}

const parseId = (fileName: string): string => basename(fileName, extname(fileName))

const parseFormat = (fileName: string): 'markdown' | 'yaml' | 'json' | undefined => {
  const ext = extname(fileName).slice(1).toLowerCase()
  const map: Record<string, 'markdown' | 'yaml' | 'json'> = {
    md: 'markdown',
    markdown: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
    json: 'json',
  }
  return map[ext]
}

const extractFrontMatter = (content: string): { attributes: Record<string, unknown>; body: string } => {
  const rawData = matter(content)
  return {
    attributes: rawData.attributes as Record<string, unknown>,
    body: rawData.body,
  }
}

const loadFirstYamlDocument = (content: string): unknown => {
  const docs = parseAllDocuments(content)
  return docs[0]?.toJS() ?? null
}

type FetchCache = { preview: boolean }

// Published content is cached for an hour; a preview must show the editor's latest commit
const cacheOptions = ({ preview }: FetchCache): RequestInit =>
  preview ? { cache: 'no-store' } : { next: { revalidate: 60 * 60 } }

const fetchText = async (url: string, cache: FetchCache): Promise<string> => {
  const response = await fetch(url, cacheOptions(cache))

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`)
  }

  return response.text()
}

const listFiles = async (
  directoryPath: string,
  ref: string,
  cache: FetchCache,
): Promise<string[]> => {
  const repo = getRepo(ref)
  const url = `https://github.com/${repo.owner}/${repo.repo}/tree/${repo.ref}/${directoryPath}`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    ...cacheOptions(cache),
  })

  if (!response.ok) {
    throw new Error(`Failed to list ${directoryPath}: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as {
    payload?: { codeViewTreeRoute?: { tree?: { items?: PublicTreeItem[] } } }
  }
  const items = payload.payload?.codeViewTreeRoute?.tree?.items ?? []

  return items
    .filter((item) => item.contentType === 'file' && typeof item.path === 'string')
    .map((item) => item.path as string)
    // Data files only: folders such as `resources/` also hold large PDFs/images (one is 31 MB)
    // that would otherwise be downloaded and parsed as text on every render
    .filter((filePath) => parseFormat(filePath) !== undefined)
}

const loadEntries = async (
  contentPath: string,
  ref: string,
  cache: FetchCache,
): Promise<[string, string][]> => {
  const fileName = contentPath.split('/').pop() ?? contentPath

  if (extname(fileName)) {
    return [[contentPath, await fetchText(rawContentUrl(contentPath, ref), cache)]]
  }

  const files = await listFiles(contentPath, ref, cache)
  const contents = await Promise.all(
    files.map((filePath) => fetchText(rawContentUrl(filePath, ref), cache)),
  )
  return contents.map((body, index) => [files[index], body])
}

const parseData = (entries: [string, string][]): [string, unknown][] =>
  entries.map(([fileName, text]) => {
    const format = parseFormat(fileName)
    const id = parseId(fileName)

    if (format === 'yaml') {
      return [id, loadFirstYamlDocument(text)]
    }

    if (format === 'json') {
      return [id, JSON.parse(text) as unknown]
    }

    if (format === 'markdown') {
      const rawData = extractFrontMatter(text)
      return [
        id,
        {
          ...rawData.attributes,
          body: rawData.body,
          id,
        },
      ]
    }

    return [id, text]
  })

/** Merges parsed files into one page object (`id` keys file stems; folders become a spread map). */
const mergeParsedEntries = (entries: [string, unknown][]): unknown => {
  const camelEntries = entries.map(
    ([key, value]): [string, unknown] => [
      key,
      typeof value === 'object' && value !== null ? deepCamelize(value) : value,
    ],
  )

  if (camelEntries.length === 1) {
    const [fileId, firstValue] = camelEntries[0]
    if (typeof firstValue !== 'object' || firstValue === null || Array.isArray(firstValue)) {
      return { id: fileId, value: firstValue }
    }
    return { id: fileId, ...(firstValue as Record<string, unknown>) }
  }

  return deepCamelize(Object.fromEntries(camelEntries)) as Record<string, unknown>
}

/** True when the branch exists in the content repo (used before enabling a preview). */
export const contentRefExists = async (ref: string): Promise<boolean> => {
  const repo = getRepo(ref)
  const url = `https://github.com/${repo.owner}/${repo.repo}/tree/${repo.ref}`

  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'no-store' })
    return response.ok
  } catch {
    return false
  }
}

const retrieveContent = async (
  contentPath: string,
  { ref }: RetrieveContentOptions = {},
): Promise<unknown> => {
  // CMS preview (draft mode) reads the editor's content branch instead of `main`
  const previewRef = ref ? undefined : await getPreviewRef()
  const contentRef = ref ?? previewRef ?? getRepo().ref
  const cache: FetchCache = { preview: Boolean(previewRef) }

  return mergeParsedEntries(parseData(await loadEntries(contentPath, contentRef, cache)))
}

export default retrieveContent
