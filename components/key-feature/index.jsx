import React from 'react'

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
      <img className="key-feature-icon" src={icon} alt={title} />
      <span className="key-feature-text">{children}</span>
    </>
  )

  return (
    <Tag className={`key-feature ${className}`} {...restProps}>
      {href != null ? (
        <Link href={href} passHref>
          <a className="key-feature-link" href={href}>
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
  const items = React.Children.map(children, child => {
    if (child.type !== KeyFeature) return null

    return React.cloneElement(child, {
      key: child.props.title,
      tag: child.props.tag ?? 'li',
    })
  })

  return <ul className={`key-feature-list ${className}`}>{items}</ul>
}

KeyFeatureList.Item = KeyFeature

export default KeyFeature
export { KeyFeature, KeyFeatureList }
