import type {
  DocsItem,
  DocsNavItem,
  DocsTutorial,
  DocumentationGuideMeta,
  DocumentationGuidePageData,
} from './types'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const normalizeHref = (value: string) => value.replace('#', '').replace('_', '-')

export const findDocsIndexByHref = (docs: DocsItem[], href: string): number => {
  const id = href.replace('#', '')
  const exact = docs.findIndex((item) => item.id === id)

  return exact >= 0 ? exact : docs.findIndex((item) => normalizeHref(item.id) === normalizeHref(id))
}

/** Maps a nav/query reference to the id actually rendered (content mixes `_` and `-`). */
export const resolveSectionId = (docs: DocsItem[], ref: string): string | undefined => {
  const index = findDocsIndexByHref(docs, ref)
  return index >= 0 ? docs[index].id : undefined
}

const toNavItem = (value: unknown): DocsNavItem | null => {
  if (!isRecord(value) || typeof value.href !== 'string') {
    return null
  }

  const title = typeof value.item === 'string' ? value.item.trim() : ''
  const children = Array.isArray(value.children)
    ? value.children.map(toNavItem).filter((item): item is DocsNavItem => Boolean(item))
    : undefined

  return {
    title,
    href: value.href,
    hidden: value.hidden === true,
    ...(children?.length ? { children } : {}),
  }
}

/** Content navigation as a tree; FAIR / Graph nest `children`, the others are flat lists. */
export const toNavItems = (navigation: unknown): DocsNavItem[] => {
  if (!isRecord(navigation)) {
    return []
  }

  const { navItems } = navigation
  const list = Array.isArray(navItems) ? navItems : isRecord(navItems) ? Object.values(navItems) : []

  return list.map(toNavItem).filter((item): item is DocsNavItem => Boolean(item))
}

// XML samples such as `<dc:relation ...>` are prose, not HTML. The old docs markdown printed them
// as text; our Markdown parses raw HTML (rehype-raw) and would drop the tags, so escape namespaced tags.
const NAMESPACED_TAG = /(?<!\\)<(\/?(?!(?:https?|mailto|ftp):)[A-Za-z][\w-]*:[\w-]+)/g

export const escapeNamespacedTags = (value: string): string =>
  value.replace(NAMESPACED_TAG, '&lt;$1')

// The old docs markdown used GFM, so bare URLs became links; our Markdown has no GFM.
// Skip URLs already inside a link, autolink or attribute (preceded by ( [ < " ' = or a word char).
const BARE_URL = /(?<![(\[<"'=\w/])https?:\/\/[^\s<>()"'\]]+/g
const TRAILING_PUNCTUATION = /[.,;:!?…]+$/

export const autolinkBareUrls = (value: string): string =>
  value.replace(BARE_URL, (match) => {
    const url = match.replace(TRAILING_PUNCTUATION, '')
    return `<${url}>${match.slice(url.length)}`
  })

// Only fields the docs render as Markdown; others (video/src/href) are plain URLs
const MARKDOWN_FIELDS = new Set(['descriptionAbout', 'subTitle', 'subDescription'])

const prepareMarkdown = (value: unknown): unknown =>
  typeof value === 'string' ? autolinkBareUrls(escapeNamespacedTags(value)) : value

const prepareMarkdownFields = (item: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key,
      MARKDOWN_FIELDS.has(key) ? prepareMarkdown(value) : value,
    ]),
  )

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const sanitizeDocumentationItem = (item: unknown): DocsItem | null => {
  if (!isRecord(item)) {
    return null
  }

  // Some content entries have no `id` (e.g. "Data providers registering with CORE");
  // the old site still rendered them, so derive one from the title instead of dropping them
  const id =
    typeof item.id === 'string' ? item.id : typeof item.title === 'string' ? slugify(item.title) : ''
  if (!id) {
    return null
  }

  const { membership: _membership, images, ...rest } = item

  return {
    ...((prepareMarkdownFields(rest) as unknown) as DocsItem),
    id,
    images: Array.isArray(images) ? (images as DocsItem['images']) : undefined,
  }
}

// Graph docs nest items under `children` / `sections` (old flatten-doc-items.js); ids may start with '#'
const flattenDocItems = (items: unknown[]): unknown[] =>
  items.flatMap((item) => {
    if (!isRecord(item)) return [item]
    const nested = item.sections ?? item.children
    const node = typeof item.id === 'string' ? { ...item, id: item.id.replace(/^#/, '') } : item

    return [node, ...(Array.isArray(nested) ? flattenDocItems(nested) : [])]
  })

export const normalizeDocumentationItems = (items: unknown): DocsItem[] => {
  if (!items) {
    return []
  }

  const list = flattenDocItems(Array.isArray(items) ? items : Object.values(items))

  return list
    .map(sanitizeDocumentationItem)
    .filter((item): item is DocsItem => Boolean(item))
}

export const getDocumentationGuideData = (
  content: Record<string, unknown>,
  docsKey: string,
  omitKeys: string[] = [],
): DocumentationGuidePageData => {
  const nextContent = { ...content }

  omitKeys.forEach((key) => {
    delete nextContent[key]
  })

  const docsSection = isRecord(nextContent[docsKey]) ? nextContent[docsKey] : {}
  const meta = isRecord(nextContent.meta) ? (nextContent.meta as DocumentationGuideMeta) : undefined

  return {
    docs: {
      items: normalizeDocumentationItems(docsSection.items),
      tutorial: isRecord(docsSection.tutorial)
        ? ((docsSection.tutorial as unknown) as DocsTutorial)
        : undefined,
    },
    navigation: toNavItems(nextContent.navigation),
    meta,
  }
}
