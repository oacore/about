'use client'

import classNames from 'classnames'

import { useSectionScroll } from './useSectionScroll'

import styles from './SectionNavLinks.module.css'

export type SectionNavLink = {
  title: string
  href: string
}

export type SectionNavLinksProps = {
  links: SectionNavLink[]
  ariaLabel: string
  className?: string
  listStyle?: 'disc' | 'decimal'
}

const SectionNavLinks = ({
  links,
  ariaLabel,
  className,
  listStyle = 'disc',
}: SectionNavLinksProps) => {
  const { handleAnchorClick, handleAnchorKeyDown } = useSectionScroll()

  if (!links.length) {
    return null
  }

  const isDecimalList = listStyle === 'decimal'

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul
        className={classNames(
          styles.redirectWrapper,
          isDecimalList && styles.redirectWrapperDecimal,
        )}
      >
        {links.map((item) => (
          <li
            className={classNames(
              styles.redirectLink,
              isDecimalList && styles.redirectLinkDecimal,
            )}
            key={item.href}
          >
            <a
              aria-label={`Scroll to ${item.title}`}
              href={`#${item.href}`}
              onClick={handleAnchorClick(item.href)}
              onKeyDown={handleAnchorKeyDown(item.href)}
              tabIndex={0}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SectionNavLinks
