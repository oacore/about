import React from 'react'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './testimonial-card.module.scss'

const ReadMore = ({ children, textMaxLength }) => {
  const text = children
  const [isReadMore, setIsReadMore] = React.useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <p className={styles.citation}>
      “{isReadMore ? `${text.slice(0, textMaxLength)}...` : text}”
      <span
        onClick={toggleReadMore}
        role="presentation"
        className={styles.readMore}
      >
        {isReadMore ? ' Show more' : ' Show less'}
      </span>
    </p>
  )
}

const TestimonialCard = ({
  imgUrl,
  title,
  description,
  author,
  extraText,
  useDivider,
  imgSmall,
  className,
}) => (
  <div className={classNames.use(styles.content).join(className)}>
    <img
      className={classNames.use(styles.logo, {
        [styles.logoSm]: imgSmall,
      })}
      src={imgUrl}
      alt={title}
      role={title == null ? 'presentation' : null}
    />
    {useDivider && <div className={styles.divider} />}
    {description && <ReadMore textMaxLength={105}>{description}</ReadMore>}
    <h6 className={styles.author}>{author}</h6>
    {extraText && <span className={styles.extra}>{extraText}</span>}
  </div>
)

export default TestimonialCard
