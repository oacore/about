import React from 'react'
import { Card, Link } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './key-feature.module.scss'

import Markdown from 'components/markdown'

const KeyFeature = ({
  title,
  children,
  icon,
  href,
  url,
  status,
  className = '',
  tag: Tag = 'div',
  ...restProps
} = {}) => {
  const content = (
    <Card
      variant="pure"
      className={classNames.use(styles.card, {
        [styles.keyFeatureContained]: status === 'data',
      })}
    >
      {status === 'data' && (
        <span className={styles.keyFeatureStatusIcon}>{status}</span>
      )}
      <a href={url}>
        <img
          className={styles.keyFeatureIcon}
          src={icon}
          alt={title}
          role={title == null ? 'presentation' : null}
        />
      </a>
      <Card.Title tag="h6" className={styles.keyFeatureTitle}>
        {title}
      </Card.Title>
      <Markdown className={styles.keyFeatureText}>{children}</Markdown>
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

export { KeyFeature, KeyFeatureList }
