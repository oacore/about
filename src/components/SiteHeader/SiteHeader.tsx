'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import { CloseIcon, CoreSymbol, MagnifyIcon, MenuIcon } from './icons'
import { HEADER_MENUS, type HeaderMenu } from './menus'
import servicesIllustration from './services-illustration.svg'

import styles from './SiteHeader.module.css'

/**
 * Site header ported from the design system (`@oacore/design` modules/header), which the old
 * about site used: same menus, layout and behaviour, with plain elements and its own CSS module
 * (no antd components), so nothing else restyles it.
 */

export type SiteHeaderSearch = {
  /** e.g. "Search 452M papers from around the world" */
  placeholder: string
  onSearch: (query: string) => void
}

type SiteHeaderProps = {
  id?: string
  search?: SiteHeaderSearch
}

const isExternal = (href: string) => /^(https?:)?\/\//.test(href)

const NavLink = ({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) =>
  isExternal(href) ? (
    <a className={className} href={href}>
      {children}
    </a>
  ) : (
    <Link className={className} href={href}>
      {children}
    </Link>
  )

const MenuPanel = ({ menu }: { menu: HeaderMenu }) => {
  if (menu.variant === 'support') {
    return (
      <>
        {menu.groups.map((group) => (
          <li className={classNames(styles.group, styles.supportMenu)} key={group.id}>
            <h3 className={styles.groupTitle} id={`${group.id}-title`}>
              {group.label}
            </h3>
            <div className={styles.groupList}>
              {group.links.map((link) => (
                <NavLink className={styles.memberMenuItem} href={link.href} key={link.href}>
                  <span className={styles.memberMenuText}>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </li>
        ))}
      </>
    )
  }

  return (
    <>
      {menu.variant === 'services' ? (
        <li className={classNames(styles.item, styles.servicesOverviewItem)}>
          <Link className={styles.itemLink} href="/services">
            {/* Decorative illustration, as in the design system header */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" height={134} src={servicesIllustration.src} width={160} />
            <span className={styles.servicesOverviewItemLabel}>Services overview</span>
            <span className={styles.servicesOverviewItemDescription}>
              Explore all CORE services
            </span>
          </Link>
        </li>
      ) : null}
      {menu.groups.map((group) => (
        <li className={styles.group} key={group.id}>
          <h3 className={styles.groupTitle} id={`${group.id}-title`}>
            {group.label}
          </h3>
          <ul aria-labelledby={`${group.id}-title`} className={styles.groupList}>
            {group.links.map((link) => (
              <li className={styles.item} key={link.href}>
                <NavLink className={styles.itemLink} href={link.href}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </>
  )
}

const MENU_VARIANT_CLASS: Record<HeaderMenu['variant'], string> = {
  services: styles.servicesMenu,
  support: styles.communitiesMenu,
  about: styles.aboutMenu,
}

const SearchBar = ({ placeholder, onSearch }: SiteHeaderSearch) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // The old search bar opened unfocused (grey, with its label); only keyboard users get focus
  const focusOnOpen = useRef(false)

  useEffect(() => {
    if (!open) return undefined

    if (focusOnOpen.current) inputRef.current?.focus()

    // Like the design system search bar: a click outside hides it again
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (value.trim()) onSearch(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') setOpen(false)
  }

  if (!open) {
    return (
      <div className={classNames(styles.searchBarItem, styles.searchBarItemIcon)}>
        <button
          aria-label={placeholder}
          className={styles.searchBarItemIconButton}
          onClick={(event) => {
            // detail is 0 when the button was activated with the keyboard
            focusOnOpen.current = event.detail === 0
            setOpen(true)
          }}
          type="button"
        >
          <MagnifyIcon />
        </button>
      </div>
    )
  }

  return (
    <div className={styles.searchBarItem} ref={containerRef}>
      <form
        action="https://core.ac.uk/search"
        className={styles.select}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        role="search"
      >
        <div className={styles.selectGroup}>
          <span className={classNames(styles.addon, styles.prepend)}>
            <MagnifyIcon />
          </span>
          <input
            aria-label={placeholder}
            autoComplete="off"
            className={styles.control}
            id="app-bar-search"
            name="q"
            onChange={(event) => setValue(event.target.value)}
            ref={inputRef}
            type="search"
            value={value}
          />
          {/* Shown over the empty, unfocused field (covers the icon), as in the old design */}
          {value ? null : (
            <label className={styles.label} htmlFor="app-bar-search">
              {placeholder}
            </label>
          )}
          <span className={classNames(styles.addon, styles.append)}>
            {value ? (
              <button
                aria-label="Clear search"
                className={styles.clearButton}
                onClick={() => {
                  setValue('')
                  inputRef.current?.focus()
                }}
                type="button"
              >
                <CloseIcon />
              </button>
            ) : null}
          </span>
        </div>
      </form>
    </div>
  )
}

// Not "header": several pages already use that id for their own first section
const SiteHeader = ({ id = 'site-header', search }: SiteHeaderProps) => {
  const headerRef = useRef<HTMLElement>(null)
  const navId = `${id}-nav`
  const pathname = usePathname()
  const [navExpanded, setNavExpanded] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState('')

  const toggleMenu = useCallback(
    (menuId: string) => setExpandedMenu((current) => (current === menuId ? '' : menuId)),
    [],
  )

  // Design system behaviour: a click outside the header, or on any link, closes the open menu
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (!target || !headerRef.current?.contains(target) || target.closest('a'))
        setExpandedMenu('')
    }

    document.body.addEventListener('click', onClick)
    return () => document.body.removeEventListener('click', onClick)
  }, [])

  // Client-side navigation keeps the header mounted: close the mobile nav on a new page
  const [currentPath, setCurrentPath] = useState(pathname)
  if (pathname !== currentPath) {
    setCurrentPath(pathname)
    setNavExpanded(false)
    setExpandedMenu('')
  }

  return (
    <header
      className={classNames(styles.container, expandedMenu && styles.expanded)}
      id={id}
      ref={headerRef}
    >
      <div className={classNames(styles.appBarItem, styles.logoContainer)}>
        <a className={styles.logoLink} href="https://core.ac.uk/">
          <span className={styles.logo}>
            <CoreSymbol className={styles.logoIcon} />
            CORE
          </span>
          <span className={styles.separator} />
          <span className={styles.peace}>
            <span className={styles.itemWrapper}>
              <span className={styles.indicator}>CO</span>nnecting
            </span>
            <span className={styles.itemWrapper}>
              <span className={styles.indicator}>RE</span>positories
            </span>
          </span>
        </a>
      </div>

      {search ? <SearchBar {...search} /> : null}

      <div className={classNames(styles.appBarItem, styles.toggleContainer)}>
        <button
          aria-controls={navId}
          aria-expanded={navExpanded}
          aria-label="Toggle navigation"
          className={styles.toggleButton}
          onClick={() => setNavExpanded((current) => !current)}
          type="button"
        >
          <MenuIcon />
        </button>
      </div>

      <nav
        aria-label="Primary"
        className={classNames(styles.appBarItem, styles.nav, navExpanded && styles.expanded)}
        id={navId}
      >
        {HEADER_MENUS.map((menu) => {
          const titleId = `${menu.id}-title`
          const expanded = expandedMenu === menu.id

          return (
            <div
              className={classNames(styles.menu, MENU_VARIANT_CLASS[menu.variant])}
              key={menu.id}
            >
              <button
                aria-expanded={expanded}
                aria-haspopup="true"
                className={styles.menuTitle}
                id={titleId}
                onClick={() => toggleMenu(menu.id)}
                type="button"
              >
                {menu.label}
              </button>
              <ul
                aria-labelledby={titleId}
                className={classNames(styles.menuList, expanded && styles.expanded)}
              >
                <MenuPanel menu={menu} />
              </ul>
            </div>
          )
        })}
      </nav>
    </header>
  )
}

export default SiteHeader
