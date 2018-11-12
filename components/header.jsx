import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge,
} from 'reactstrap'
import NextLink from 'next/link'


const Link = ({ href, children }) => (
  <NavItem>
    <NextLink href={href}>
      <NavLink>{children}</NavLink>
    </NextLink>
  </NavItem>
)

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <Navbar color="light" light expand="md" className="mb-3">
        <NextLink href="/">
          <NavbarBrand>
            CORE&nbsp;
            <Badge color="secondary" className="text-uppercase">
              beta
            </Badge>
          </NavbarBrand>
        </NextLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}


export default Header
