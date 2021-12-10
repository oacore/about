import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './testimonial.module.scss'
import TestimonialCard from '../components/testimonial-card'

export const TestimonialItem = ({
  title,
  description,
  logo,
  citation,
  author,
  extraText,
  className = '',
  tag: Tag = 'div',
  ...restProps
}) => (
  <Tag className={classNames.use(styles.item).join(className)} {...restProps}>
    <div className={styles.header}>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.description}>{description}</p>
    </div>
    <div className={styles.content}>
      <TestimonialCard
        imgUrl={logo}
        title={title}
        description={citation}
        author={author}
        extraText={extraText}
        imgSmall
        useDivider
      />
    </div>
  </Tag>
)

export const TestimonialList = ({ children, className = '' }) => {
  const items = React.Children.map(children, (child) => {
    if (child.type !== TestimonialItem) return null
    return React.cloneElement(child, {
      key: child.props.caption,
      tag: child.props.tag ?? 'li',
    })
  })

  return <ul className={`${styles.list} ${className}`}>{items}</ul>
}

TestimonialList.Item = TestimonialItem
