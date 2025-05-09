import React, { useState, useEffect } from 'react'
import { Nav, NavItem, NavLink, TabContent } from 'reactstrap'
import { classNames } from '@oacore/design/lib/utils'

import styles from './citation-tabs.module.scss'
import CitationTab from './tab'

const CitationTabManager = ({ children, onToggle }) => {
  const [navItems, setNavItems] = useState([])
  const [activeTabId, setActiveTabId] = useState(null)

  useEffect(() => {
    const newNavItems = React.Children.map(children, (child) => {
      if (child.type !== CitationTab) {
        throw new Error(
          "CitationTabsManager's children must be of CitationTab type"
        )
      }

      if (!child.props.id || !child.props.title) {
        throw new Error(
          "CitationTabsManager's children must have 'id' and 'title' props to be accessible from navigation"
        )
      }

      return {
        id: child.props.id,
        name: child.props.title,
      }
    })

    const activeTab = newNavItems.find(({ id }) => activeTabId === id)
    const newActiveTabId = activeTab
      ? activeTab.id
      : (newNavItems.length && newNavItems[0].id) || null

    if (activeTabId !== newActiveTabId && onToggle) onToggle(newActiveTabId)

    setNavItems(newNavItems)
    setActiveTabId(newActiveTabId)
  }, [children, activeTabId, onToggle])

  const toggleTab = (event) => {
    event.persist()
    event.preventDefault()
    const newActiveTabId = event.target.hash.slice(1)
    setActiveTabId(newActiveTabId)
    if (onToggle) onToggle(newActiveTabId)
  }

  return (
    <>
      <Nav className={styles.navItems} tabs>
        {navItems.map(({ id, name }) => (
          <NavItem className={styles.navItem} key={id}>
            <NavLink
              href={`#${id}`}
              onClick={toggleTab}
              className={classNames.use(styles.navLink, {
                [styles.activeLink]: activeTabId === id,
              })}
            >
              {name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTabId}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            tabId: child.props.id,
          })
        )}
      </TabContent>
    </>
  )
}

export default CitationTabManager
