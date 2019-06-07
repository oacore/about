import React from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import './menu-hover.scss'

class MenuHover extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.state = {
      dropdownOpen: false,
    }
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true })
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false })
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }))
  }

  render() {
    return (
      <div>
        <Dropdown
          className="menu-hover d-inline-block"
          onMouseOver={this.onMouseEnter}
          onFocus={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <a href="/home">Dropdown</a>
          <DropdownToggle nav style={{ display: 'inline' }}>
            &#9660; &#9650;
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

export default MenuHover
