import { isContentAssetPath, toContentAssetUrl } from '@/lib/content/assets'

const SITE_BASE_URL = process.env.SITE_BASE_URL ?? 'https://core.ac.uk'

const INTERNAL_PREFIXES = [
  '/about',
  '/benefits',
  '/blocking-diagnostic',
  '/confirm_registration_api',
  '/confirm_registration_dataset',
  '/cookies',
  '/data',
  '/data-availability',
  '/distinctive-characteristics',
  '/documentation',
  '/environmental-impact-statement',
  '/fresh-finds',
  '/gep',
  '/faq',
  '/governance',
  '/history',
  '/innovations',
  '/labs',
  '/member',
  '/membership',
  '/membership-request-status',
  '/modern-slavery',
  '/oai_resolver',
  '/ref',
  '/rights-retention',
  '/sdg',
  '/services',
  '/sponsorship',
  '/terms',
  // static markdown pages (src/app/[slug])
  '/accessibility',
  '/acknowledge',
  '/how-core-supports-open-access',
  '/privacy',
]

export const resolveHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#')) {
    return url
  }

  if (isContentAssetPath(url)) {
    return toContentAssetUrl(url)
  }

  const path = url.startsWith('/') ? url : `/${url}`
  const pathname = path.split(/[?#]/)[0]
  const isInternal = INTERNAL_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  if (isInternal) {
    return path
  }

  return new URL(path, SITE_BASE_URL).href
}

export const toImageUrl = (path: string): string => toContentAssetUrl(path)

export const getSearchUrl = (query: string): string => {
  const searchUrl = new URL('/search', SITE_BASE_URL)
  searchUrl.searchParams.set('q', query)
  return searchUrl.toString()
}

export type LinkProps = {
  href: string
  rel?: string
  target?: '_blank'
}

export const getLinkProps = (href: string): LinkProps => {
  if (!href.startsWith('http')) {
    return { href }
  }

  return {
    href,
    rel: 'noopener noreferrer',
    target: '_blank',
  }
}
