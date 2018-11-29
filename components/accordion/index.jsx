import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bind } from 'decko'

import AccordionItem from './item'

import './accordion.scss'

// TODO: Make it semantic
// TODO: Add support of item open from the first render
class Accordion extends Component {
  static propTypes = {
    tag: PropTypes.node,
  }

  static defaultProps = {
    tag: 'div',
  }

  state = {
    activeItemId: null,
  }

  @bind
  toggleItem(itemId) {
    this.setState(({ activeItemId }) => ({
      activeItemId: activeItemId === itemId ? null : itemId,
    }))
  }

  render() {
    const { tag: Tag, children } = this.props

    const items = React.Children.map(children, item =>
      React.cloneElement(item, {
        isOpen: item.props.id === this.state.activeItemId,
        onToggle: this.toggleItem,
      })
    )

    return <Tag className="accordion">{items}</Tag>
  }
}

Accordion.Item = AccordionItem

export default Accordion
export { Accordion, AccordionItem }
