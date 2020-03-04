import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bind } from 'decko'

import AccordionItem from './item'

// TODO: Make it semantic: provide aria-* attributes
class Accordion extends Component {
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

    const { children } = this.props
    React.Children.forEach(children, ({ props: { id } }) => {
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
        const { onToggle } = this.props
        const { activeItemId } = this.state
        onToggle(activeItemId)
      }
    )
  }

  render() {
    const { className, tag: Tag, children } = this.props

    const { activeItemId } = this.state
    const items = React.Children.map(children, item =>
      React.cloneElement(item, {
        isOpen: item.props.id === activeItemId,
        onToggle: this.toggleItem,
      })
    )

    return <Tag className={`accordion ${className}`}>{items}</Tag>
  }
}

Accordion.Item = AccordionItem
Accordion.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.node,
  onToggle: PropTypes.func,
}
Accordion.defaultProps = {
  className: '',
  tag: 'div',
  onToggle: () => {},
}
export default Accordion
export { Accordion, AccordionItem }
