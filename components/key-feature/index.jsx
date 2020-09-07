import React from 'react'

import styles from './key-feature.module.scss'
import { Link } from '../elements'

const KeyFeature = ({
  title,
  children,
  icon,
  href,
  className = '',
  tag: Tag = 'div',
  ...restProps
} = {}) => {
  const content = (
    <>
      <img className={styles.keyFeatureIcon} src={icon} alt={title} />
      <span className={styles.keyFeatureText}>{children}</span>
    </>
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
