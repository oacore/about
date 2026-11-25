'use client'

import classNames from 'classnames'

import { useSectionScroll } from '@components/SectionNavLinks'

import type { PageNavLink, PageNavProps, PageNavSourceLink } from './types'

import styles from './PageNav.module.css'

const resolveHref = (href: string): string => {
  if (
    href.startsWith('#') ||
    href.startsWith('/') ||
    href.startsWith('http://') ||
    href.startsWith('https://')
  ) {
    return href
  }

  return `#${href}`
}

const getSectionId = (href: string): string | undefined => {
  const resolved = resolveHref(href)

  if (!resolved.startsWith('#') || resolved.length < 2) {
    return undefined
  }

  return resolved.slice(1)
}

const toPageNavLinks = (links: PageNavSourceLink[] = []): PageNavLink[] =>
  links.flatMap((item) => {
    const href = item.href ?? item.id
    const title = item.caption ?? item.link ?? item.title

    if (!href || !title) {
      return []
    }

    return [{ href, title }]
  })

const PageNav = ({ links, ariaLabel, className, variant = 'primary' }: PageNavProps) => {
  const { handleAnchorClick, handleAnchorKeyDown } = useSectionScroll()
  const pageLinks = toPageNavLinks(links)

  if (!pageLinks.length) {
    return null
  }

  return (
    <nav aria-label={ariaLabel} className={classNames(styles.navWrapper, className)}>
      {pageLinks.map((item) => {
        const href = resolveHref(item.href)
        const sectionId = getSectionId(item.href)

        return (
          <a
            aria-label={sectionId ? `Scroll to ${item.title}` : item.title}
            className={classNames(styles.linkItem, variant === 'muted' && styles.linkItemMuted)}
            href={href}
            key={`${href}-${item.title}`}
            onClick={sectionId ? handleAnchorClick(sectionId) : undefined}
            onKeyDown={sectionId ? handleAnchorKeyDown(sectionId) : undefined}
            tabIndex={0}
          >
            {item.title}
          </a>
        )
      })}
    </nav>
  )
}

export default PageNav
