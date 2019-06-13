import React from 'react'
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Nav,
} from 'reactstrap'
import { bind } from 'decko'

import './menu-hover-xs.scss'

class MenuHoverXs extends React.Component {
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
      <Nav className="ml-auto d-md-none" navbar>
        <UncontrolledDropdown
          inNavbar
          nav
          className="menu-hover"
          isOpen={isOpen}
          toggle={this.toggle}
        >
          <div className="d-flex">
            <a className="nav-link d-flex mr-auto" href="/home" nav>
              MenuHoverXs component
            </a>
            <img
              className="menu-angle"
              src="/static/images/icons/angle-down.svg"
              alt="angle down"
            />
            <img
              className="menu-angle"
              src="/static/images/icons/angle-up.svg"
              alt="angle up"
            />
            <div className="d-flex">
              <DropdownToggle nav>xxx</DropdownToggle>
            </div>
          </div>
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

export default MenuHoverXs
