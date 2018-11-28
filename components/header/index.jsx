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
  DropdownItem,
} from 'reactstrap'
import { bind } from 'decko'
import Link from '../link'

import Logo from '../logo'

import './header.scss'

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

  static renderMenu({ title, path, children, sections }, level = 0) {
    // Menu for top level: dropdown or regular item
    if (level === 0) {
      return (
        <Nav className="ml-auto" navbar>
          {children.map(node => Header.renderMenu(node, level + 1))}
        </Nav>
      )
    }

    // Sectioned dropdown menu if sections are present
    if (sections) {
      return (
        <UncontrolledDropdown nav={level === 1} inNavbar key={title}>
          <DropdownToggle nav caret>
            {title}
          </DropdownToggle>
          <DropdownMenu right>
            {sections.map(section => (
              <React.Fragment>
                <DropdownItem header key={section.title}>
                  {section.title}
                </DropdownItem>
                {section.children.map(node =>
                  Header.renderMenu(node, level + 2)
                )}
              </React.Fragment>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }

    // Regular dropdown for regular children
    if (children) {
      return (
        <UncontrolledDropdown nav={level === 1} inNavbar key={title}>
          <DropdownToggle nav caret>
            {title}
          </DropdownToggle>
          <DropdownMenu right>
            {children.map(node => Header.renderMenu(node, level + 1))}
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }

    // NavItem-s for first leafs and DropdownItems-s for final leafs
    return level === 1 ? (
      <NavItem key={path}>
        <Link href={path}>
          <NavLink>{title}</NavLink>
        </Link>
      </NavItem>
    ) : (
      <Link href={path} key={path}>
        <DropdownItem>{title}</DropdownItem>
      </Link>
    )
  }

  render() {
    const { logo, siteMap } = this.props
    const { isOpen } = this.state

    return (
      <Navbar color="light" light expand="md" className="header">
        {logo && (
          <Link href="/">
            <NavbarBrand>
              <Logo textOnly />
            </NavbarBrand>
          </Link>
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
