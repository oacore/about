import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bind } from 'decko'

import AccordionItem from './item'

// TODO: Make it semantic: provide aria-* attributes
class Accordion extends Component {
  static propTypes = {
    className: PropTypes.string,
    tag: PropTypes.node,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    tag: 'div',
    onToggle: () => {},
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
    this.setState(
      ({ activeItemId }) => ({
        activeItemId: activeItemId === itemId ? null : itemId,
      }),
      () => {
        this.props.onToggle(this.state.activeItemId)
      }
    )
  }

  render() {
    const { className, tag: Tag, children } = this.props

    const items = React.Children.map(children, item =>
      React.cloneElement(item, {
        isOpen: item.props.id === this.state.activeItemId,
        onToggle: this.toggleItem,
      })
    )

    return <Tag className={`accordion ${className}`}>{items}</Tag>
  }
}

Accordion.Item = AccordionItem

export default Accordion
export { Accordion, AccordionItem }
