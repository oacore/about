import React from 'react'

const Section = ({
  children,
  large = false,
  small = false,
  className = '',
  tag: Tag = 'section',
  ...restProps
}) => {
  const classNames = [
    'section',
    large ? 'section-lg' : '',
    small ? 'section-sm' : '',
    className,
  ].join(' ')
  return (
    <Tag className={classNames} {...restProps}>
      {children}
    </Tag>
  )
}

export default Section
