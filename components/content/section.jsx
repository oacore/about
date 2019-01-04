import React, { Fragment, Component } from 'react'
import { Container as BootstrapContainer } from 'reactstrap'

class Section extends Component {
  /** Checks is component Section-like
   *
   * Section-like element must contain 'Section' in the name.
   *
   * The way to check is so stupid because of performance.
   * The function is called dozens of times over each page. So it's better to
   * have a convention than have a complex method to check component
   * by instancing or composition.
   *
   * Considered other ways to check:
   * - try to create an instance of child.type (TestComponent parameter)
   *   and check it to be instance of Section
   * - try to get first child of a component and check it's instance to
   *   be Section-like too
   * Again, it's thrown away because of performance and complexity.
   *
   * KISS
   */
  static isSection(TestComponent) {
    if (typeof TestComponent != 'function') return false
    if (TestComponent.name != null)
      return TestComponent.name.includes('Section')
    return false
  }

  static getContainerComponent(containerProp) {
    if (typeof containerProp == 'boolean')
      return containerProp ? BootstrapContainer : Fragment

    return containerProp
  }

  // TODO: Fix react-warning-keys
  static containerize(children, containerProp) {
    const Container = Section.getContainerComponent(containerProp)

    let containerPull = []
    const containered = children.reduce((resultPull, child, i) => {
      if (Section.isSection(child.type)) {
        if (containerPull.length > 0) {
          // eslint-disable-next-line react/no-array-index-key
          resultPull.push(<Container key={i}>{containerPull}</Container>)
          containerPull = []
        }

        resultPull.push(
          React.cloneElement(child, {
            container: Container,
            key: child.key || child.props.id || i,
          })
        )
      } else {
        containerPull.push(
          React.cloneElement(child, {
            key: child.key || child.props.id || i,
          })
        )
      }

      return resultPull
    }, [])

    if (containerPull.length)
      containered.push(<Container>{containerPull}</Container>)

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
