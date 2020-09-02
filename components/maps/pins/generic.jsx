import React from 'react'

import styles from './pins.module.scss'

const Pin = ({ children, className = '', tag: Tag = 'div', ...restProps }) => (
  <Tag className={`${styles.pin} ${className}`} {...restProps}>
    {children}
  </Tag>
)

export default Pin
