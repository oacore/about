import React, { Component } from 'react'
import { bind } from 'decko'

import AccordionItem from './accordion/item'

class Collapsed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: !!this.props.open,
    }
  }

  @bind
  toggle() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  }

  render() {
    const { open, ...restProps } = this.props
    const { isOpen } = this.state
    return (
      <AccordionItem isOpen={isOpen} onToggle={this.toggle} {...restProps} />
    )
  }
}

export default Collapsed
