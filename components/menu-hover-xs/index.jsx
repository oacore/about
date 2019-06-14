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
            <div className="d-flex">
              <DropdownToggle nav>
                {!isOpen ? (
                  <span
                    style={{
                      background:
                        'url(/static/images/icons/angle-down.svg) no-repeat',
                      padding: '10px 20px',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      background:
                        'url(/static/images/icons/angle-up.svg) no-repeat',
                      padding: '10px 20px',
                    }}
                  />
                )}
              </DropdownToggle>
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
