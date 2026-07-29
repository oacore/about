import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Icon } from '@oacore/design/lib'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

/* TODO replace with design */

function normalizeHref(str) {
  return str.replace('#', '').replace('_', '-')
}

export function findNavHrefById(items, id) {
  if (!items?.length) return null

  const normalizedId = normalizeHref(id)

  return items.reduce((match, item) => {
    if (match) return match
    if (item.href && normalizeHref(item.href) === normalizedId) return item.href

    return findNavHrefById(item.children, id)
  }, null)
}

const getNavItems = (textData) =>
  Array.isArray(textData.navItems)
    ? textData.navItems
    : Object.values(textData.navItems)

const DocumentationMembershipNav = ({
  textData,
  setHighlight,
  activeHref,
  setNavActiveHref,
  docItems,
  mulltyDocs,
}) => {
  const [localActiveHref, setLocalActiveHref] = useState(null)
  const headerHeight = 56
  const mobileHeaderHeight = 150
  const navItems = getNavItems(textData)

  const handleClick = (item) => {
    if (!item.href) return

    window.location.href = item.href
    setLocalActiveHref(item.href)
    setNavActiveHref(null)

    const id = item.href.replace('#', '')
    const docIndex = docItems?.findIndex((docItem) => docItem.id === id)
    if (docIndex >= 0) setHighlight(docIndex)

    const element = document.getElementById(id)
    if (element) {
      const rect = element.getBoundingClientRect()
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      const adjustedHeaderHeight = isMobile ? mobileHeaderHeight : headerHeight

      window.scrollTo({
        top: rect.top + window.scrollY - adjustedHeaderHeight,
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  const renderNavItems = (items, level = 0) =>
    items.flatMap((item, index) => {
      const hasHref = Boolean(item.href)
      const isActive = !activeHref
        ? localActiveHref === item.href
        : activeHref === item.href
      const key = `${level}-${index}-${item.item}`

      const navItem = (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
        <li
          className={classNames.use(
            styles.siderItem,
            styles[`siderItemLevel${Math.min(level, 5)}`],
            {
              [styles.hiddenItem]: item.hidden,
              [styles.activeItem]: hasHref && isActive,
              [styles.siderGroupItem]: !hasHref,
            }
          )}
          key={key}
          onClick={hasHref ? () => handleClick(item) : undefined}
        >
          <ReactMarkdown className={styles.siderItemLink}>
            {item.item}
          </ReactMarkdown>
          {hasHref && isActive ? (
            <span className={styles.logo}>
              <Icon src="#active-arrow" />
            </span>
          ) : (
            ''
          )}
        </li>
      )

      if (!item.children?.length) return [navItem]

      return [navItem, ...renderNavItems(item.children, level + 1)]
    })

  return (
    <div
      className={classNames.use({
        [styles.siderWrapper]: mulltyDocs,
      })}
    >
      {mulltyDocs && <div className={styles.placeholder}>Outline</div>}
      <ul className={styles.sider}>{renderNavItems(navItems)}</ul>
    </div>
  )
}

export default DocumentationMembershipNav
