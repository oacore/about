import React from 'react'
import { Container as BootstrapContainer } from 'reactstrap'

const Section = props => {
  const {
    children,
    large = false,
    small = false,
    className = '',
    container = true,
    tag: Tag = 'section',
    ...restProps
  } = props
  const classNames = [
    'section',
    large ? 'section-lg' : null,
    small ? 'section-sm' : null,
    className,
  ]
    .filter(truthy => truthy)
    .join(' ')

  if (!container) {
    return (
      <Tag className={classNames} {...restProps}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag className={classNames} {...restProps}>
      <BootstrapContainer>{children}</BootstrapContainer>
    </Tag>
  )
}

export default Section
