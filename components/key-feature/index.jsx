import React from 'react'

import './key-feature.scss'

const KeyFeature = ({
  title,
  children,
  icon,
  className = '',
  tag: Tag = 'div',
  ...args
} = {}) => (
  <Tag className={`key-feature ${className || ''}`} {...args}>
    <img className="key-feature-icon" src={icon} alt={title} />
    <div className="key-feature-text">{children}</div>
  </Tag>
)

const KeyFeatureList = ({ children, className = '' } = {}) => {
  const items = React.Children.map(children, child => {
    if (child.type !== KeyFeature) return null

    return React.cloneElement(child, {
      tag: 'li',
      key: child.props.title,
    })
  })

  return <ul className={`key-feature-list ${className}`}>{items}</ul>
}

KeyFeatureList.Item = KeyFeature

export default KeyFeature
export { KeyFeature, KeyFeatureList }
