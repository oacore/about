import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown } from 'reactstrap'
import { bind } from 'decko'

class NavDropdown extends React.Component {
  state = {
    isOpen: false,
  }

  dropdownComponent = null

  @bind
  toggleOnHoverIn() {
    this.toggleOnHover(true)
  }

  @bind
  toggleOnHoverOut() {
    this.toggleOnHover(false)
  }

  toggleOnHover(nextState) {
    // eslint-disable-next-line react/no-find-dom-node
    const dropdownElement = ReactDOM.findDOMNode(
      this.dropdownComponent
    ).closest('.navbar')

    const breakpointName = dropdownElement.className.match(
      /\b navbar-expand-(\w+) \b/
    )[1]

    const breakpointSize = getComputedStyle(dropdownElement).getPropertyValue(
      `--breakpoint-${breakpointName}`
    )

    if (window.matchMedia(`(min-width: ${breakpointSize})`).matches)
      this.toggle(nextState)
  }

  @bind
  toggle(nextState) {
    this.setState(({ isOpen }) => ({
      isOpen: typeof nextState == 'boolean' ? nextState : !isOpen,
    }))
  }

  render() {
    const { children, ...restProps } = this.props
    const { isOpen } = this.state

    return (
      <Dropdown
        ref={(component) => {
          this.dropdownComponent = component
        }}
        isOpen={isOpen}
        toggle={this.toggle}
        onMouseEnter={this.toggleOnHoverIn}
        onMouseLeave={this.toggleOnHoverOut}
        {...restProps}
      >
        {children}
      </Dropdown>
    )
  }
}

export default NavDropdown
