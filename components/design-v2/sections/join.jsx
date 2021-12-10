import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './join.module.scss'

export const JoinItem = ({
  caption,
  url,
  picture,
  className = '',
  tag: Tag = 'div',
  ...restProps
}) => (
  <Tag
    className={classNames.use(styles.joinItem).join(className)}
    {...restProps}
  >
    <img
      className={styles.joinItemIcon}
      src={picture}
      alt={caption}
      role={caption == null ? 'presentation' : null}
    />
    <Button href={url} className={styles.joinItemButton} variant="contained">
      {caption}
    </Button>
  </Tag>
)

export const JoinList = ({ children, className = '' }) => {
  const items = React.Children.map(children, (child) => {
    if (child.type !== JoinItem) return null
    return React.cloneElement(child, {
      key: child.props.caption,
      tag: child.props.tag ?? 'li',
    })
  })

  return <ul className={`${styles.joinList} ${className}`}>{items}</ul>
}

JoinList.Item = JoinItem
