import React from 'react'

import logoPath from './core-symbol.svg'
import styles from './logo.module.scss'

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
  <Tag className={`${styles.logo} ${className}`} {...restProps}>
    <img src={logoPath} alt={alt} />
    {text}
  </Tag>
))

export default Logo
