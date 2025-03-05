import React from 'react'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './testimonial-card.module.scss'

export const ReadMore = ({ children, textMaxLength, renderBreak }) => {
  const text = children
  const [isReadMore, setIsReadMore] = React.useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <p className={styles.citation}>
      “{isReadMore ? `${text.slice(0, textMaxLength)}...` : text}”
      {renderBreak && <br />}
      <span
        onClick={toggleReadMore}
        role="presentation"
        className={classNames.use(styles.readMore, {
          [styles.renderBreak]: renderBreak,
        })}
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
  textMaxLength = 110,
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
    {description && description.length > textMaxLength ? (
      <ReadMore textMaxLength={textMaxLength}>{description}</ReadMore>
    ) : (
      <p className={styles.citation}>{description}</p>
    )}
    <h6 className={styles.author}>{author}</h6>
    {extraText && <span className={styles.extra}>{extraText}</span>}
  </div>
)

export default TestimonialCard
