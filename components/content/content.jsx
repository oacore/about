import classNames from '@oacore/design/lib/utils/class-names'
import React from 'react'

import Markdown from '../markdown'
import styles from './content.module.scss'

const Content = ({
  children,
  className = '',
  tag: Tag = 'div',
  // @deprecated All usages must be replaced to Markdown component
  markdown = false,
  ...restProps
}) => {
  // const classNames = `content ${className}`
  if (markdown) {
    return (
      <Markdown tag={Tag} className={className} {...restProps}>
        {children}
      </Markdown>
    )
  }

  return (
    <Tag
      className={classNames.use(styles.content).join(className)}
      {...restProps}
    >
      {children}
    </Tag>
  )
}

export default Content
