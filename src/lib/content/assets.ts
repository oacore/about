// Images and downloadable files live in the content repo (oacore/content) and are
// served by its GitHub Pages site, so this app does not keep copies in public/.
export const ASSETS_BASE_URL =
  process.env.CONTENT_ASSETS_BASE_URL ?? 'https://oacore.github.io/content/'

const ASSET_PATH = /(?<![a-zA-Z0-9])\/(?:images|resources)\/[a-zA-Z0-9_./-]+/g
const ASSET_PREFIX = /^\/?(?:images|resources)\//

const toAbsoluteUrl = (path: string): string =>
  `${ASSETS_BASE_URL.replace(/\/?$/, '')}/${path.replace(/^\/+/, '')}`

export const isContentAssetPath = (path: string): boolean => ASSET_PREFIX.test(path)

/** `/images/x.svg` or `resources/x.pdf` → absolute URL in the content repo */
export const toContentAssetUrl = (path: string): string =>
  path.startsWith('http://') || path.startsWith('https://') ? path : toAbsoluteUrl(path)

/** Rewrites every `/images/…` and `/resources/…` path inside a string (Markdown, HTML, plain values) */
export const rewriteAssetPaths = (value: string): string =>
  value.replace(ASSET_PATH, toAbsoluteUrl)
