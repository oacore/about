import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { bind } from 'decko'

const SwitcherItem = ({
  children,
  active = false,
  className = '',
  tag: Tag = 'div',
  ...restProps
}) => (
  <Tag
    className={`switcher-item ${active ? 'active' : ''} ${className}`}
    tabIndex={active ? undefined : -1}
    {...restProps}
  >
    {children}
  </Tag>
)

const SwitcherContent = ({ children, tag: Tag = 'div', ...restProps }) => (
  <Tag className="switcher-content" {...restProps}>
    {children}
  </Tag>
)

/* eslint-disable jsx-a11y/mouse-events-have-key-events */

class Switcher extends Component {
  static propTypes = {
    tag: PropTypes.node,
    actionEvent: PropTypes.oneOf(['click', 'hover']),
    interval: PropTypes.number,
    onChange: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    pauseOnMouseOver: PropTypes.bool,
  }

  static defaultProps = {
    tag: 'div',
    actionEvent: 'hover',
    interval: 0,
    onChange: () => {},
    onMouseOver: () => {},
    onMouseLeave: () => {},
    pauseOnMouseOver: true,
  }

  state = {
    items: [],
    activeItemIndex: 0,
    content: null,
    pause: false,
  }

  static getDerivedStateFromProps({ children }, state) {
    const items = []
    let content = null

    React.Children.forEach(children, child => {
      if (child == null) return

      // Extracting SwitcherContent
      if (child.type === SwitcherContent) {
        if (content) {
          throw new Error(
            'Switcher should have no more than one SwithcerContent'
          )
        }
        content = child
        return
      }

      // Extracting SwitcherItems
      if (child.type === SwitcherItem) {
        items.push(child)
        return
      }

      throw new Error(
        "Switcher's children must be instances of SwitcherItem or SwitcherContent"
      )
    })

    let { activeItemIndex } = state
    if (items.length !== state.items.length) {
      activeItemIndex = items.findIndex(({ props }) => props.active)
      if (activeItemIndex < 0) activeItemIndex = 0
    }

    return {
      items,
      activeItemIndex,
      content,
    }
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }

  start() {
    if (this.state.pause) return

    const { interval } = this.props
    if (interval > 0)
      this.timeoutId = setTimeout(this.activateNextItem, interval)
  }

  stop() {
    if (this.timeoutId > 0) clearTimeout(this.timeoutId)
  }

  @bind
  play() {
    this.setState({ pause: false }, this.start)
  }

  @bind
  pause() {
    this.setState({ pause: true }, this.stop)
  }

  activateItem(index) {
    this.stop()
    this.setState({ activeItemIndex: index }, () => {
      this.props.onChange(this.state.items[index].props.id)
      this.start()
    })
  }

  @bind
  activateNextItem() {
    const { items, activeItemIndex } = this.state
    const nextItem = (activeItemIndex + 1) % items.length

    this.activateItem(nextItem)
  }

  @bind
  handleMouseOver() {
    if (this.props.pauseOnMouseOver) this.pause()
  }

  @bind
  handleMouseLeave() {
    if (this.props.pauseOnMouseOver) this.play()
  }

  handleChange(index) {
    this.activateItem(index)
  }

  render() {
    const { tag: Tag, className = '', actionEvent } = this.props
    const { content, items, activeItemIndex } = this.state

    const buttons = items.map((item, i) => {
      const { id, title, picture } = item.props

      const onActivate = this.handleChange.bind(this, i)
      const eventListeners =
        actionEvent === 'click'
          ? { onClick: onActivate }
          : { onMouseOver: onActivate, onFocus: onActivate }

      return (
        <Button
          color="link"
          type="button"
          className="switcher-button"
          active={i === activeItemIndex}
          value={i}
          key={id}
          {...eventListeners}
        >
          {picture ? <img src={picture} alt={title} /> : title}
        </Button>
      )
    })

    return (
      <Tag
        className={`switcher ${className}`}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
      >
        {content}
        <div className="switcher-item-list">
          {items.map((item, i) =>
            React.cloneElement(item, { active: i === activeItemIndex })
          )}
        </div>
        <div className="switcher-controllers">{buttons}</div>
      </Tag>
    )
  }
}

Switcher.Item = SwitcherItem
Switcher.Content = SwitcherContent

export default Switcher
export { SwitcherItem }
