import React from 'react'

import logoPath from './core-symbol.svg'

const Logo = React.forwardRef((
  {
    text = 'CORE',
    alt = text ? '' : 'CORE',
    className = '',
    tag: Tag = 'div',
    ...restProps
  },
  // eslint-disable-next-line no-unused-vars
  _
) => (
  <Tag className={`logo ${className}`} {...restProps}>
    <img src={logoPath} alt={alt} />
    {text}
  </Tag>
))

export default Logo
