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
    actionEvent: PropTypes.oneOf(['click', 'hover']),
    interval: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    tag: 'div',
    itemTag: 'div',
    actionEvent: 'hover',
    interval: 0,
    onChange: () => {},
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

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }

  start() {
    const { interval } = this.props
    if (interval > 0)
      this.timeoutId = setTimeout(this.activateNextItem, interval)
  }

  stop() {
    if (this.timeoutId > 0) window.clearTimeout(this.timeoutId)
  }

  activateItem(id) {
    this.stop()
    this.setState({ activeItemId: id }, () => {
      this.props.onChange(id)
      this.start()
    })
  }

  @bind
  activateNextItem() {
    const { children } = this.props
    const { activeItemId } = this.state
    const itemIds = React.Children.map(children, ({ props }) => props.id)
    const activeItemIndex = itemIds.indexOf(activeItemId)
    const nextItemId = itemIds[(activeItemIndex + 1) % itemIds.length]

    this.activateItem(nextItemId)
  }

  render() {
    const {
      tag: Tag,
      itemTag,
      children,
      className = '',
      actionEvent,
    } = this.props
    const { activeItemId } = this.state

    const items = React.Children.map(children, item => {
      if (item.type !== SwitcherItem)
        throw new Error('Switcher items should be instances of SwitcherItem')

      return React.cloneElement(item, {
        tag: itemTag,
        active: item.props.id === activeItemId,
        // key: item.key || item.props.id,
      })
    })

    const buttons = items.map(item => {
      const { id, title, picture } = item.props

      const onActivate = this.activateItem.bind(this, id)
      const eventListeners =
        actionEvent === 'click'
          ? { onClick: onActivate }
          : { onMouseOver: onActivate, onFocus: onActivate }

      return (
        <Button
          color="link"
          type="button"
          className="switcher-button"
          active={id === activeItemId}
          key={id}
          {...eventListeners}
        >
          {picture ? <img src={picture} alt={title} /> : title}
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
