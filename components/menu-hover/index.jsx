import React from 'react'
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Nav,
} from 'reactstrap'
import './menu-hover.scss'
import { bind } from 'decko'

class MenuHover extends React.Component {
  state = {
    isOpen: false,
  }

  @bind
  onMouseEnter() {
    this.setState({ isOpen: true })
  }

  @bind
  onMouseLeave() {
    this.setState({ isOpen: false })
  }

  @bind
  toggle(event) {
    event.preventDefault()

    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  }

  render() {
    const { isOpen } = this.state

    return (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown
          inNavbar
          nav
          className="menu-hover"
          onMouseOver={this.onMouseEnter}
          onFocus={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          isOpen={isOpen}
          toggle={this.toggle}
        >
          <a href="/home" style={{ display: 'inline' }}>
            Dropdown
          </a>
          &nbsp;
          <DropdownToggle nav style={{ display: 'inline' }}>
            &#9660; &#9650;
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    )
  }
}

export default MenuHover
