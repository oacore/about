import React from 'react'

import './number-pin.scss'

const Pin = ({ children, tag: Tag = 'div', ...restProps }) => (
  <Tag className="number-pin" {...restProps}>
    {children}
  </Tag>
)

export default Pin
