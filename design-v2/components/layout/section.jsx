import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

const Section = ({ className, children, ...props }) => (
  <section
    className={classNames.use(styles.section).join(className)}
    {...props}
  >
    {children}
  </section>
)

export default Section
