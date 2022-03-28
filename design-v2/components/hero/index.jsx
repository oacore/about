import React from 'react'
import { Card, Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import SearchForm from '../search-form'
import styles from './styles.module.scss'

const Hero = ({
  title,
  image: imgHref,
  label,
  description,
  action,
  actionLabel,
  className,
}) => (
  <div className={classNames.use(styles.heroItem).join(className)}>
    <Card variant="pure" className={styles.heroItemCard}>
      <Card.Title tag="h2" className={styles.heroTitle}>
        {title}
      </Card.Title>
      <Card.Description tag="div">
        {action === 'Search' ? (
          <SearchForm />
        ) : (
          <>
            {description && (
              <p className={styles.heroItemDescription}>{description}</p>
            )}
            {actionLabel && (
              <Button tag="a" variant="contained" href={action}>
                {actionLabel}
              </Button>
            )}
          </>
        )}
      </Card.Description>
    </Card>
    <div className={styles.heroItemImgContainer}>
      <img
        src={imgHref}
        alt={label}
        className={classNames.use(styles.heroItemImg, {
          [styles.heroItemImgBig]: action === 'Search',
        })}
      />
    </div>
  </div>
)

export default Hero
