import React, { useState, useEffect } from 'react'
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

const Article = ({ children, ...props }) => {
  const [content, setContent] = useState([])
  const [header, setHeader] = useState([])
  const [navItems, setNavItems] = useState([])

  useEffect(() => {
    const headerInner = []
    const contentInner = []
    React.Children.forEach(children, child => {
      if (!child) return
      if (typeof child.type == 'string' && child.type.match(/header|h[1-6]/))
        headerInner.push(child)
      else contentInner.push(child)
    })

    const navItemsInner = React.Children.map(children, child => {
      if (child == null) return null
      const { caption, id } = child.props
      if (!caption || !id) return null
      return { text: caption, href: `#${id}` }
    })

    setNavItems(navItemsInner)
    setHeader(headerInner)
    setContent(contentInner)
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

  const { nav, className, tag: Tag = 'acticle', ...restProps } = props

  return (
    <Tag className={`article ${className || ''}`.trim()} {...restProps}>
      {renderHeader()}
      {content}
    </Tag>
  )
}

Article.propTypes = {
  tag: PropTypes.node,
  nav: PropTypes.bool,
}

Article.defaultProps = {
  tag: 'article',
  nav: false,
}

export default Article
