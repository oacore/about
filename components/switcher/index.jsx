import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { bind } from 'decko'

import './switcher.scss'

const SwitcherItem = ({
  children,
  active = false,
  className = '',
  tag: Tag = 'div',
  ...args
}) => (
  <Tag
    className={`switcher-item ${active ? 'active' : ''} ${className}`}
    {...args}
  >
    {children}
  </Tag>
)

class Switcher extends React.Component {
  static propTypes = {
    tag: PropTypes.node,
    itemTag: PropTypes.node,
  }

  static defaultProps = {
    tag: 'div',
    itemTag: 'div',
    className: '',
  }

  state = {
    activeItemId: null,
  }

  static getDerivedStateFromProps({ children }, state) {
    if (state.activeItemId) return state

    let activeItemId = ''
    React.Children.forEach(children, ({ props: { id, active } }) => {
      if (!activeItemId) activeItemId = id
      if (active) activeItemId = id
    })

    return {
      ...state,
      activeItemId,
    }
  }

  @bind
  activateItem(id) {
    this.setState({ activeItemId: id })
  }

  render() {
    const { tag: Tag, itemTag, className, children } = this.props
    const { activeItemId } = this.state

    const items = React.Children.map(children, item => {
      if (item.type !== SwitcherItem)
        throw new Error('Switcher items should be instances of SwitcherItem')

      return React.cloneElement(item, {
        tag: itemTag,
        active: item.props.id === activeItemId,
        key: item.id,
      })
    })

    const buttons = items.map(item => {
      const { id, title, icon } = item.props

      return (
        <Button
          outline
          color="secondary"
          type="button"
          active={id === activeItemId}
          onClick={() => this.activateItem(id)}
          key={id}
        >
          {icon ? <img src={icon} alt={title} /> : title}
        </Button>
      )
    })

    return (
      <Tag className={`switcher ${className}`}>
        <div className="switcher-item-list">{items}</div>
        <div className="switcher-controllers">{buttons}</div>
      </Tag>
    )
  }
}

Switcher.Item = SwitcherItem

export default Switcher
export { SwitcherItem }
