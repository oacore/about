import React from 'react'

const Pin = ({ children, className = '', tag: Tag = 'div', ...restProps }) => (
  <Tag className={`pin ${className}`} {...restProps}>
    {children}
  </Tag>
)

export default Pin
