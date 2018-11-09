import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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
      <Navbar color="dark" dark expand="md" className="mb-3">
        <NextLink href="/">
          <NavbarBrand>CORE</NavbarBrand>
        </NextLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Link href="/about">About</Link>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}


export default Header
