import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { bind } from 'decko'

import Link from '../link'
import Logo from '../logo'
import SearchNavbar from '../search-navbar'
import NavDropdown from '../nav-dropdown'
import styles from './header.module.scss'

class Header extends React.Component {
  state = {
    isOpen: false,
  }

  @bind
  toggle(event) {
    event.preventDefault()

    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  }

  static renderMenu(
    { title, path, children, sections },
    activePath,
    level = 0
  ) {
    // Menu for top level: dropdown or regular item
    if (level === 0) {
      return (
        <Nav className="ml-auto" navbar>
          {children.map(node => Header.renderMenu(node, activePath, level + 1))}
        </Nav>
      )
    }

    const key = path ? `${title} (${path})` : title

    // Sectioned dropdown menu if sections are present
    if (sections) {
      return (
        <NavDropdown nav={level === 1} inNavbar key={key}>
          <div className="nav-link-group">
            <Link href={path} passHref>
              <NavLink>{title}</NavLink>
            </Link>
            <DropdownToggle
              className="dropdown-toggle"
              tag="button"
              type="button"
              nav
            >
              Toggle {title} menu
            </DropdownToggle>
          </div>
          <DropdownMenu className="dropdown-menu-wide" right>
            {sections.map(section => (
              <div className="dropdown-section" key={section.title}>
                <DropdownItem header tag="p">
                  {section.title}
                </DropdownItem>
                {section.children.map(node =>
                  Header.renderMenu(node, activePath, level + 2)
                )}
              </div>
            ))}
          </DropdownMenu>
        </NavDropdown>
      )
    }

    // Regular dropdown for regular children
    if (children) {
      return (
        <NavDropdown nav={level === 1} inNavbar key={key}>
          <div className="nav-link-group">
            <Link href={path} passHref>
              <NavLink>{title}</NavLink>
            </Link>
            <DropdownToggle
              className="dropdown-toggle"
              tag="button"
              type="button"
              nav
            >
              Toggle {title} menu
            </DropdownToggle>
          </div>
          <DropdownMenu right>
            {children.map(node =>
              Header.renderMenu(node, activePath, level + 1)
            )}
          </DropdownMenu>
        </NavDropdown>
      )
    }

    // NavItem-s for first leafs and DropdownItems-s for final leafs
    return level === 1 ? (
      <NavItem key={key}>
        <Link href={path}>
          <NavLink>{title}</NavLink>
        </Link>
      </NavItem>
    ) : (
      <Link href={path} key={key} passHref>
        <DropdownItem>{title}</DropdownItem>
      </Link>
    )
  }

  render() {
    const {
      logo,
      siteMap,
      className = '',
      searchFormProps,
      showSearch,
      activeRoute,
    } = this.props
    const { isOpen } = this.state

    return (
      <Navbar
        light
        color="light"
        expand="md"
        className={`${styles.header} ${className}`}
        tag="header"
      >
        <Container>
          {logo && (
            <Link href="/" passHref>
              <Logo tag={NavbarBrand} />
            </Link>
          )}
          {showSearch && <SearchNavbar {...searchFormProps} />}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            {Header.renderMenu({ children: siteMap }, activeRoute)}
          </Collapse>
        </Container>
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
  // eslint-disable-next-line react/forbid-prop-types
  searchFormProps: PropTypes.object.isRequired,
  showSearch: PropTypes.bool,
  activeRoute: PropTypes.string.isRequired,
}

Header.defaultProps = {
  logo: true,
  showSearch: true,
}

export default Header
