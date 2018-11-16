import React from 'react'
import PropTypes from 'prop-types'
import { bind } from 'decko'

import AccordionItem from './item'

import './accordion.scss'

// TODO: Make it semantic
// TODO: Add support of item open from the first render
class Accordion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItemId: null,
    }
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

Accordion.propTypes = {
  tag: PropTypes.node,
}

Accordion.defaultProps = {
  tag: 'div',
}

Accordion.Item = AccordionItem

export default Accordion
export { Accordion, AccordionItem }
