import React, { Component } from 'react'
import { bind } from 'decko'

import AccordionItem from './accordion/item'

class Collapsed extends Component {
  constructor(props) {
    super(props)

    const { open } = this.props
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      isOpen: !!open,
    }
  }

  componentDidMount() {
    const { id } = this.props
    if (window.location.hash.substr(1) === id) this.setState({ isOpen: true })
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
