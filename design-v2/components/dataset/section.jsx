import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import { Section } from '../layout'
import styles from './styles.module.scss'

const DatasetSection = ({
  title,
  children,
  accentColor,
  className,
  ...props
}) => (
  <Section
    className={classNames.use(styles.section).join(className)}
    {...props}
  >
    <h4
      className={classNames.use(styles.sectionTitle).join(styles[accentColor])}
    >
      {title}
    </h4>
    <div className={styles.list}>{children}</div>
  </Section>
)

export default DatasetSection
