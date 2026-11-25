'use client'

import { ArrowRightOutlined } from '@ant-design/icons'
import { Anchor, Typography, type AnchorProps } from 'antd'
import { useCallback, useMemo, useRef } from 'react'

import type { DocsItem, DocsNavItem } from '../types'
import { resolveSectionId } from '../utils'

import styles from './DocsNav.module.css'

type AnchorItem = NonNullable<AnchorProps['items']>[number]

export type DocsNavProps = {
  items: DocsNavItem[]
  /** Used to point each link at the section id actually rendered. */
  docs: DocsItem[]
  /** Distance from the viewport top where a section counts as "current" (sticky header + gap). */
  offset: number
  /** Fires with the active section id as the page scrolls. */
  onActiveChange?: (id: string | undefined) => void
  /** Fires after a link is clicked (the mobile drawer closes on it). */
  onNavigate?: () => void
}

const BOLD_LABEL = /^\*\*([\s\S]+?)\*\*$/

/** Content labels are tiny markdown: `**1. Chapter**` marks a chapter heading. */
const NavLabel = ({ title }: { title: string }) => {
  const bold = title.match(BOLD_LABEL)

  return (
    <>
      {bold ? (
        <strong className={styles.chapter}>{bold[1].trim()}</strong>
      ) : (
        <span>{title.replace(/\*\*/g, '')}</span>
      )}
      {/* Shown only on the active link (CSS), like the old nav indicator */}
      <span aria-hidden className={styles.arrow}>
        <ArrowRightOutlined />
      </span>
    </>
  )
}

const toAnchorItems = (items: DocsNavItem[], docs: DocsItem[]): AnchorItem[] =>
  items
    .filter((item) => !item.hidden)
    .map((item) => {
      const id = resolveSectionId(docs, item.href) ?? item.href.replace('#', '')
      const children = item.children ? toAnchorItems(item.children, docs) : []

      return {
        key: id,
        href: `#${id}`,
        title: <NavLabel title={item.title} />,
        ...(children.length ? { children } : {}),
      }
    })

/** Keeps the active link visible inside the nav's own scroll area (never scrolls the page). */
const revealActiveLink = (container: HTMLElement | null, href: string) => {
  // Found by href, not the active class: antd reports the change before it re-renders
  const link = container?.querySelector<HTMLElement>(`a[href="${CSS.escape(href)}"]`)

  if (!container || !link) {
    return
  }

  const containerRect = container.getBoundingClientRect()
  const linkRect = link.getBoundingClientRect()
  const margin = 48

  if (linkRect.top < containerRect.top + margin || linkRect.bottom > containerRect.bottom - margin) {
    // Instant: the page is already scrolling, an animated nav would lag behind fast scrolls
    container.scrollTop += linkRect.top - containerRect.top - container.clientHeight / 3
  }
}

const DocsNav = ({ items, docs, offset, onActiveChange, onNavigate }: DocsNavProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const anchorItems = useMemo(() => toAnchorItems(items, docs), [items, docs])

  const handleChange = useCallback(
    (currentHref: string) => {
      onActiveChange?.(currentHref ? currentHref.replace('#', '') : undefined)

      if (currentHref) {
        revealActiveLink(scrollRef.current, currentHref)
      } else if (scrollRef.current) {
        // Back above the first section: show the outline from its start
        scrollRef.current.scrollTop = 0
      }
    },
    [onActiveChange],
  )

  const handleClick: AnchorProps['onClick'] = () => {
    onNavigate?.()
  }

  return (
    <nav aria-label="Documentation outline" className={styles.nav}>
      <Typography.Title className={styles.heading} level={5}>
        Outline
      </Typography.Title>
      <div className={styles.scroll} ref={scrollRef}>
        <Anchor
          affix={false}
          className={styles.anchor}
          items={anchorItems}
          onChange={handleChange}
          onClick={handleClick}
          // Update the hash without stacking a history entry per click
          replace
          targetOffset={offset}
        />
      </div>
    </nav>
  )
}

export default DocsNav
