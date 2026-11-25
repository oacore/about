export const resolveActionHref = (url: string): string => {
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('#') ||
    url.startsWith('/')
  ) {
    return url
  }

  return `/${url}`
}

export const resolveExternalTarget = (url?: string): string | undefined =>
  url?.startsWith('http') ? '_blank' : undefined

/** CMS markdown often omits the leading slash. Keep `~` links for the Markdown resolver. */
export const normalizeMarkdownLinks = (value?: string): string => {
  if (!value) {
    return ''
  }

  return value.replace(/\]\((?!https?:\/\/|mailto:|#|\/|~)([^)]+)\)/g, '](/$1)')
}

export const prepareBenefitsMarkdown = (value?: string): string =>
  normalizeMarkdownLinks(value).replace(/\]\(~register-data-provider\)/g, '](#join-core)')

/** Old FAQ anchors used by benefits content, mapped to the current FAQ item slugs. */
const FAQ_ANCHOR_ALIASES: Record<string, string> = {
  '#badges': '#indexed-by-CORE-snippet',
}

/** Join-block badge links point into the FAQ page (old site: `faq/${href}`). */
export const resolveFaqHref = (href: string): string =>
  href.startsWith('#') ? `/faq${FAQ_ANCHOR_ALIASES[href] ?? href}` : resolveActionHref(href)
