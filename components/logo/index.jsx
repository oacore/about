import React from 'react'

import logoPath from './core-symbol.svg'

const Logo = ({
  text = 'CORE',
  alt = text ? '' : 'CORE',
  className = '',
  tag: Tag = 'div',
  ...restProps
}) => (
  <Tag className={`logo ${className}`} {...restProps}>
    <img src={logoPath} alt={alt} />
    {text}
  </Tag>
)

export default Logo
