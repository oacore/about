import React from 'react'

import './image-pin.scss'

const Pin = ({ src, alt, tag: Tag = 'div', ...restProps }) => (
  <Tag className="image-pin" {...restProps}>
    <img src={src} alt={alt} />
  </Tag>
)

export default Pin
