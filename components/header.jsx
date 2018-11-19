import React from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'
import NextLink from 'next/link'
import { bind } from 'decko'

import Logo from './logo'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  @bind
  toggle() {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  }

  static renderMenu({ title, path, children }, level = 0) {
    if (level === 0) {
      return (
        <Nav className="ml-auto" navbar>
          {children.map(node =>
            node.children ? (
              Header.renderMenu(node, level + 1)
            ) : (
              <NavItem key={node.path}>
                <NextLink href={node.path}>
                  <NavLink>{node.title}</NavLink>
                </NextLink>
              </NavItem>
            )
          )}
        </Nav>
      )
    }

    return children ? (
      <UncontrolledDropdown nav={level === 1} inNavbar key={path}>
        <DropdownToggle nav caret>
          {title}
        </DropdownToggle>
        <DropdownMenu right>
          {children.map(node => Header.renderMenu(node, level + 1))}
        </DropdownMenu>
      </UncontrolledDropdown>
    ) : (
      <NextLink href={path} key={path}>
        <NavLink>{title}</NavLink>
      </NextLink>
    )
  }

  render() {
    const { logo, siteMap } = this.props
    const { isOpen } = this.state

    return (
      <Navbar color="light" light expand="md" className="mb-3">
        {logo && (
          <NextLink href="/">
            <NavbarBrand>
              <Logo textOnly />
            </NavbarBrand>
          </NextLink>
        )}
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {Header.renderMenu({ children: siteMap })}
        </Collapse>
      </Navbar>
    )
  }
}

const LinkType = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

const LinkTypeShape = PropTypes.shape(LinkType)

LinkType.children = PropTypes.arrayOf(LinkTypeShape)

Header.propTypes = {
  logo: PropTypes.bool,
  siteMap: PropTypes.arrayOf(LinkTypeShape).isRequired,
}

Header.defaultProps = {
  logo: true,
}

export default Header
