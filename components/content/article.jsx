import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Nav, NavItem, NavLink } from 'reactstrap'

const ArticleHeader = ({ children, className, ...restProps }) => (
  <div className={`article-header container ${className || ''}`} {...restProps}>
    {children}
  </div>
)

const ArticleNav = ({ items }) => (
  <Nav className="article-nav">
    {items.map(({ text, href }) => (
      <NavItem key={href}>
        <NavLink href={href}>{text}</NavLink>
      </NavItem>
    ))}
  </Nav>
)

const Article = ({ children, fullHeight, ...props }) => {
  const { navItems, header, content } = useMemo(() => {
    const headerInner = []
    const contentInner = []
    React.Children.forEach(children, (child) => {
      if (!child) return
      if (typeof child.type == 'string' && child.type.match(/header|h[1-6]/))
        headerInner.push(child)
      else contentInner.push(child)
    })

    const navItemsInner = React.Children.map(children, (child) => {
      if (child == null) return null
      const { caption, id } = child.props
      if (!caption || !id) return null
      return { text: caption, href: `#${id}` }
    })

    return {
      navItems: navItemsInner,
      header: headerInner,
      content: contentInner,
    }
  }, [children])

  const renderHeader = () => {
    const { nav } = props

    if (header.length === 0) return null

    return (
      <ArticleHeader>
        {header}
        {nav && <ArticleNav items={navItems} />}
      </ArticleHeader>
    )
  }

  const { nav, className, tag: Tag = 'article', ...restProps } = props

  return (
    <Tag
      className={`article ${fullHeight ? 'fullHeight' : ''} ${
        className || ''
      }`.trim()}
      {...restProps}
    >
      {renderHeader()}
      {content}
    </Tag>
  )
}

Article.propTypes = {
  tag: PropTypes.node,
  nav: PropTypes.bool,
  fullHeight: PropTypes.bool,
}

Article.defaultProps = {
  tag: 'article',
  nav: false,
  fullHeight: false,
}

export default Article
