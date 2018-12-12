import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bind } from 'decko'

import AccordionItem from './item'

import './accordion.scss'

// TODO: Make it semantic: provide aria-* attributes
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

  static getDerivedStateFromProps({ children }, state) {
    if (state.activeItemId) return state

    let activeItemId = null
    React.Children.forEach(children, ({ props: { id, isOpen } }) => {
      if (isOpen) activeItemId = id
    })

    return {
      ...state,
      activeItemId,
    }
  }

  componentDidMount() {
    let activeItemId = ''

    React.Children.forEach(this.props.children, ({ props: { id } }) => {
      if (window.location.hash === `#${id}`) activeItemId = id
    })

    if (activeItemId) this.setState({ activeItemId })
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
