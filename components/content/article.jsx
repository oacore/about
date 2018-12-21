import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Nav, NavItem, NavLink } from 'reactstrap'

import Section from './section'

const ArticleNav = ({ items }) => (
  <Nav>
    {items.map(({ text, href }) => (
      <NavItem>
        <NavLink href={href}>{text}</NavLink>
      </NavItem>
    ))}
  </Nav>
)

class Article extends Component {
  static propTypes = {
    tag: PropTypes.node,
    nav: PropTypes.bool,
    container: PropTypes.bool,
  }

  static defaultProps = {
    tag: 'article',
    nav: false,
    container: false,
  }

  state = {
    header: null,
    content: null,
    navItems: [],
  }

  static getDerivedStateFromProps({ children }, state) {
    const navItems = React.Children.map(children, child => {
      if (!child || child.type !== Section || !child.props.id) return null

      const { caption, id } = child.props
      return { text: caption, href: `#${id}` }
    })

    const header = []
    const content = []
    React.Children.forEach(children, child => {
      if (!child) return
      if (typeof child.type == 'string' && child.type.match(/header|h[1-6]/))
        header.push(child)
      else content.push(child)
    })

    return {
      ...state,
      header,
      content,
      navItems,
    }
  }

  render() {
    const { nav, className, tag: Tag, container, ...args } = this.props
    const { header, content, navItems } = this.state
    const inner = [header, nav && <ArticleNav items={navItems} />, content]

    return (
      <Tag className={`article ${className || ''}`} {...args}>
        {container ? <Container>{inner}</Container> : inner}
      </Tag>
    )
  }
}

export default Article
