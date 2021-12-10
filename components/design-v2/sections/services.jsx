import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './services.module.scss'

export const ServiceItem = ({
  title,
  subtitle,
  imgUrl,
  className = '',
  tag: Tag = 'div',
  ...restProps
}) => (
  <Tag className={classNames.use(styles.item).join(className)} {...restProps}>
    <img
      className={styles.icon}
      src={imgUrl}
      alt={title}
      role={title == null ? 'presentation' : null}
    />
    <h4 className={styles.title}>{title}</h4>
    <p className={styles.subtitle}>{subtitle}</p>
  </Tag>
)

export const ServicesList = ({ children, className = '' }) => {
  const items = React.Children.map(children, (child) => {
    if (child.type !== ServiceItem) return null
    return React.cloneElement(child, {
      key: child.props.caption,
      tag: child.props.tag ?? 'li',
    })
  })

  return <ul className={`${styles.list} ${className}`}>{items}</ul>
}

ServicesList.Item = ServiceItem
