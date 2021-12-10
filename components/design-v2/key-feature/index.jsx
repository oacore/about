import React from 'react'
import { Card, Link } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './key-feature.module.scss'

const KeyFeature = ({
  title,
  children,
  icon,
  href,
  status,
  className = '',
  tag: Tag = 'div',
  ...restProps
} = {}) => {
  const content = (
    <Card
      variant="pure"
      className={classNames.use(styles.card, {
        [styles.keyFeatureContained]: status === 'new',
      })}
    >
      {status === 'new' && (
        <span className={styles.keyFeatureStatusIcon}>{status}</span>
      )}
      <img
        className={styles.keyFeatureIcon}
        src={icon}
        alt={title}
        role={title == null ? 'presentation' : null}
      />
      <Card.Title tag="h6" className={styles.keyFeatureTitle}>
        {title}
      </Card.Title>
      <span className={styles.keyFeatureText}>{children}</span>
    </Card>
  )

  return (
    <Tag className={`${styles.keyFeature} ${className}`} {...restProps}>
      {href != null ? (
        <Link href={href} passHref>
          <a className={styles.keyFeatureLink} href={href}>
            {content}
          </a>
        </Link>
      ) : (
        content
      )}
    </Tag>
  )
}

const KeyFeatureList = ({ children, className = '' } = {}) => {
  const items = React.Children.map(children, (child) => {
    if (child.type !== KeyFeature) return null
    return React.cloneElement(child, {
      key: child.props.title,
      tag: child.props.tag ?? 'li',
    })
  })

  return <ul className={`${styles.keyFeatureList} ${className}`}>{items}</ul>
}

KeyFeatureList.Item = KeyFeature

export default KeyFeature
export { KeyFeature, KeyFeatureList }
