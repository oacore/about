import React from 'react'

import Markdown from '../markdown'

const Content = ({
  children,
  className = '',
  tag: Tag = 'div',
  // @deprecated All usages must be replaced to Markdown component
  markdown = false,
  ...restProps
}) => {
  const classNames = `content ${className}`

  if (markdown) {
    return (
      <Markdown tag={Tag} className={classNames} {...restProps}>
        {children}
      </Markdown>
    )
  }

  return (
    <Tag className={classNames} {...restProps}>
      {children}
    </Tag>
  )
}

export default Content
