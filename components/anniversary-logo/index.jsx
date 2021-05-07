import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import Logo from '../logo'
import styles from './styles.module.scss'

const AnniversaryLogo = ({ className, tag: Tag = 'div', ...passProps }) => (
  <Tag
    className={classNames.use(styles.container).join(className)}
    {...passProps}
  >
    <Logo className={styles['with-hat']} />
    <div className={styles.years}>
      10
      <br />
      years
    </div>
  </Tag>
)

export default AnniversaryLogo
