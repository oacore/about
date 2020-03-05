import React from 'react'

import Pin from './generic'

const ImagePin = ({ src, alt, className = '', ...restProps }) => (
  <Pin className={`image-pin ${className}`} {...restProps}>
    <img src={src} alt={alt} />
  </Pin>
)

export default ImagePin
