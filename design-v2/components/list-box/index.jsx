import classNames from '@oacore/design/lib/utils/class-names'
import React from 'react'

import styles from './styles.module.scss'

const ListBox = ({ list, className }) => (
  <ul className={classNames.use(styles.list).join(className)}>
    {list.map((item) => (
      <li className={styles.item} key={item.name}>
        <a href={item.action} className={styles.link}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
)
export default ListBox