import React from 'react'

const Section = props => {
  const {
    children,
    large = false,
    small = false,
    className = '',
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

  return (
    <Tag className={classNames} {...restProps}>
      {children}
    </Tag>
  )
}

export default Section
