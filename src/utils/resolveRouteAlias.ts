/**
 * TODO check: Content links can use `~name` route aliases (old about repo: core.routes.yml + router.js).
 * Only aliases whose path differs from `/<name>` are listed; anything else falls back to `/<name>`.
 */
const ROUTE_ALIASES: Record<string, string> = {
  mission: '/about#our-mission',
  team: '/about#team',
  internships: '/about#internships',
  endorsements: '/about/endorsements',
  'research-outputs': '/about/research-outputs',
  contact: '/about#contact',
  disclaimer: '/terms#disclaimer',
  community: '/governance',
  'community/research': '/governance/research',
  'community/supporters': '/governance/supporters',
  'services/fast-sync': '/services/fastsync',
  'services/fast': '/services/fastsync',
  'services/labs-oadiscovery': '/services/labs/discovery',
  'services/search': '/search',
  support: '/services/support',
  'services-sparqlendpoint': '/services/sparqlendpoint',
  'register-data-provider': '/data-providers?query=&size=10&action=add#add-new-data-provider',
  'benefits-of-joining': '/benefits',
  blog: 'https://blog.core.ac.uk',
}

/** Resolves `~alias/rest?query#hash`, matching the longest alias prefix like the old router. */
export const resolveRouteAlias = (href: string): string => {
  if (!href.startsWith('~')) return href

  const key = href.slice(1)
  const suffixIndex = key.search(/[?#]/)
  const path = (suffixIndex === -1 ? key : key.slice(0, suffixIndex)).replace(/\/$/, '')
  const suffix = suffixIndex === -1 ? '' : key.slice(suffixIndex)

  const segments = path.split('/')
  for (let length = segments.length; length > 0; length -= 1) {
    const alias = ROUTE_ALIASES[segments.slice(0, length).join('/')]

    if (alias) {
      const rest = segments.slice(length).join('/')
      return `${alias}${rest ? `/${rest}` : ''}${suffix}`
    }
  }

  return `/${path}${suffix}`
}
