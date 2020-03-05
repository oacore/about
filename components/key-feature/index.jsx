import React, { Fragment } from 'react'

import { Link } from '../elements'

const KeyFeature = ({
  title,
  children,
  icon,
  href,
  className = '',
  tag: Tag,
  ...restProps
} = {}) => {
  const WrapperTag = Tag || href ? Fragment : 'div'
  const ContentTag = Tag !== 'a' && href ? 'a' : Fragment

  const contentProps =
    ContentTag !== Fragment
      ? {
          className: `key-feature ${className} key-feature-link`,
          ...restProps,
        }
      : restProps

  return (
    <WrapperTag className={`key-feature ${className}`} {...restProps}>
      <Link href={href} passHref>
        <ContentTag {...contentProps}>
          <img className="key-feature-icon" src={icon} alt={title} />
          <div className="key-feature-text">{children}</div>
        </ContentTag>
      </Link>
    </WrapperTag>
  )
}

const KeyFeatureList = ({ children, className = '' } = {}) => {
  const items = React.Children.map(children, child => {
    if (child.type !== KeyFeature) return null

    return React.cloneElement(child, {
      key: child.props.title,
    })
  })

  return <ul className={`key-feature-list ${className}`}>{items}</ul>
}

KeyFeatureList.Item = KeyFeature

export default KeyFeature
export { KeyFeature, KeyFeatureList }
