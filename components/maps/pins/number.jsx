import React from 'react'

import Pin from './generic'

const NumberPin = ({ value, name, className = '', ...restProps }) => (
  <Pin className={`${className}`} {...restProps}>
    {value} <span className="sr-only">{name}</span>
  </Pin>
)

export default NumberPin
