import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

const Layout = ({ tag: Tag = 'div', children, className, ...restProps }) => (
  <Tag className={classNames.use(styles.layout).join(className)} {...restProps}>
    {children}
  </Tag>
)

export default Layout
