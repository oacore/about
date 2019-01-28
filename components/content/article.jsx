import React from 'react'
import PropTypes from 'prop-types'
import { Nav, NavItem, NavLink } from 'reactstrap'

import Section from './section'

const ArticleNav = ({ items }) => (
  <Nav className="article-nav">
    {items.map(({ text, href }) => (
      <NavItem key={href}>
        <NavLink href={href}>{text}</NavLink>
      </NavItem>
    ))}
  </Nav>
)

class Article extends Section {
  static propTypes = {
    tag: PropTypes.node,
    nav: PropTypes.bool,
    container: PropTypes.bool,
  }

  static defaultProps = {
    tag: 'article',
    nav: false,
    container: true,
  }

  state = {
    header: null,
    content: null,
    navItems: [],
  }

  static getDerivedStateFromProps({ children }, state) {
    const navItems = React.Children.map(children, child => {
      if (child == null || !Section.isSection(child.type) || !child.props.id)
        return null

      const { caption, id } = child.props
      return { text: caption, href: `#${id}` }
    })

    const header = []
    const content = []
    React.Children.forEach(children, child => {
      if (!child) return
      if (typeof child.type == 'string' && child.type.match(/header|h[1-6]/))
        header.push(child)
      else content.push(React.cloneElement(child, { caption: undefined }))
    })

    return {
      ...state,
      header,
      content,
      navItems,
    }
  }

  renderHeader() {
    const { nav, container } = this.props
    const { header, navItems } = this.state

    if (header.length === 0 && (!nav || navItems.length === 0)) return null

    const Container = Section.getContainerComponent(container)

    return (
      <Container>
        {header}
        {nav && <ArticleNav items={navItems} />}
      </Container>
    )
  }

  renderContent() {
    const { container } = this.props
    const { content } = this.state
    const Container = Section.getContainerComponent(container)

    return Section.containerize(content, Container)
  }

  render() {
    const { nav, className, tag: Tag, container, ...restProps } = this.props

    return (
      <Tag className={`article ${className || ''}`} {...restProps}>
        {this.renderHeader()}
        {this.renderContent()}
      </Tag>
    )
  }
}

export default Article
