import React, { Component } from 'react'
import { Nav, NavItem, NavLink, TabContent } from 'reactstrap'
import { bind } from 'decko'
import { classNames } from '@oacore/design/lib/utils'

import styles from './citation-tabs.module.scss'
import CitationTab from './tab'

class CitationTabManager extends Component {
  state = {
    navItems: [],
    activeTabId: null,
  }

  static getDerivedStateFromProps({ children, onToggle }, state) {
    const navItems = React.Children.map(children, (child) => {
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

    const activeTab = navItems.find(({ id }) => state.activeTabId === id)
    const activeTabId = activeTab
      ? activeTab.id
      : (navItems.length && navItems[0].id) || null
    if (state.activeTabId !== activeTabId && onToggle) onToggle(activeTabId)

    return {
      ...state,
      navItems,
      activeTabId,
    }
  }

  @bind
  toggleTab(event) {
    event.persist()
    event.preventDefault()
    this.setState(
      {
        activeTabId: event.target.hash.slice(1),
      },
      () => {
        const { activeTabId } = this.state
        const { onToggle } = this.props
        if (onToggle) onToggle(activeTabId)
      }
    )
  }

  render() {
    const { children } = this.props
    const { activeTabId, navItems } = this.state

    return (
      <>
        <Nav className={styles.navItems} tabs>
          {navItems.map(({ id, name }) => (
            <NavItem className={styles.navItem} key={id}>
              <NavLink
                href={`#${id}`}
                onClick={this.toggleTab}
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
}

export default CitationTabManager
