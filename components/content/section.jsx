import React, { Fragment, Component } from 'react'
import { Container as BootstrapContainer } from 'reactstrap'

class Section extends Component {
  static isInheritedSection(TestComponent) {
    if (typeof TestComponent != 'function') return false

    if (TestComponent === Section) return true

    for (
      let prototype = Object.getPrototypeOf(TestComponent);
      prototype;
      prototype = Object.getPrototypeOf(prototype)
    )
      if (prototype === Section) return true

    return false
  }

  static isSectionLike(component) {
    if (!React.isValidElement(component)) return false
    if (typeof component.type != 'function') return false

    if (Section.isInheritedSection(component.type)) return true

    if (React.isValidElement(component.props.children))
      return Section.isSectionLike(component.props.children)

    let child
    try {
      child = component.type(component.props)
    } catch (ignored) {
      // eslint-disable-next-line new-cap
      child = new component.type(component.props)
    }

    return Section.isSectionLike(child)
  }

  static isSection(component) {
    if (typeof component == 'function')
      return Section.isInheritedSection(component)
    if (typeof component == 'object') return Section.isSectionLike(component)
    return false
  }

  static getContainerComponent(containerProp) {
    if (typeof containerProp == 'boolean')
      return containerProp ? BootstrapContainer : Fragment

    return containerProp
  }

  static containerize(children, containerProp) {
    const Container = Section.getContainerComponent(containerProp)

    let containerPull = []
    const containered = children.reduce((resultPull, child, i) => {
      const childKey =
        child.key ||
        child.props.id ||
        `${child.type.name || child.type.toString()}-${i}`

      if (Section.isSectionLike(child)) {
        if (containerPull.length > 0) {
          // eslint-disable-next-line react/no-array-index-key
          resultPull.push(
            <Container key={containerPull.map(({ type }) => type).join(',')}>
              {containerPull}
            </Container>
          )
          containerPull = []
        }

        resultPull.push(
          React.cloneElement(child, { key: childKey, container: Container })
        )
      } else containerPull.push(React.cloneElement(child, { key: childKey }))

      return resultPull
    }, [])

    if (containerPull.length) {
      containered.push(
        <Container key={containerPull.map(({ type }) => type).join(',')}>
          {containerPull}
        </Container>
      )
    }

    return containered
  }

  render() {
    const {
      children,
      large = false,
      small = false,
      className = '',
      container = true,
      tag: Tag = 'section',
      ...restProps
    } = this.props
    const classNames = [
      'section',
      large ? 'section-lg' : '',
      small ? 'section-sm' : '',
      className,
    ].join(' ')

    return (
      <Tag className={classNames} {...restProps}>
        {Section.containerize(React.Children.toArray(children), container)}
      </Tag>
    )
  }
}

export default Section
