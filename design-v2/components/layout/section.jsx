import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

const Section = ({ className, children, useFullPageWidth, ...props }) => (
  <section
    className={classNames
      .use(styles.container, {
        [styles.full]: useFullPageWidth,
      })
      .join(className)}
    {...props}
  >
    {useFullPageWidth ? <div>{children}</div> : children}
  </section>
)

export default Section
