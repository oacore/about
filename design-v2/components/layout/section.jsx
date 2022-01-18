import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

const Section = ({ className, children }) => (
  <section className={classNames.use(styles.section).join(className)}>
    {children}
  </section>
)

export default Section
