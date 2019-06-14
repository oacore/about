import React from 'react'
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
} from 'reactstrap'
import withSizes from 'react-sizes'

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
    const { isMobile } = this.props

    if (isMobile) {
      return (
        <Nav navbar>
          <UncontrolledDropdown
            inNavbar
            nav
            isOpen={isOpen}
            toggle={this.toggle}
          >
            <div className="d-flex">
              <a className="nav-link d-flex mr-auto" href="/home" nav>
                MenuHover component (Xs size)
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

    return (
      <Nav navbar>
        <UncontrolledDropdown
          inNavbar
          nav
          onMouseOver={this.onMouseEnter}
          onFocus={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          isOpen={isOpen}
          toggle={this.toggle}
        >
          <a className="p-1" href="/home" nav>
            MenuHoverLg
          </a>
          {/* <DropdownToggle nav /> */}

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

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
})

export default withSizes(mapSizesToProps)(MenuHover)
