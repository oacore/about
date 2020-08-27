import React from 'react'
import { Card, CardTitle, CardText } from 'reactstrap'

import { Link } from '../elements'
import styles from './service-group-card.module.scss'

const ServiceGroupCard = ({ className = '', title, items, ...restProps }) => (
  <Card
    className={`${styles.serviceGroupCard} card-body ${className}`}
    {...restProps}
  >
    <CardTitle className={styles.cardTitle} tag="h4">
      {title}
    </CardTitle>
    <CardText>
      <dl className={styles.servicesGroupCardList}>
        {items.map(
          ({ title: itemTitle, shortDescription, action: { url } }) => (
            <div key={title}>
              <dt>
                <Link href={url}>{itemTitle}</Link>
              </dt>
              {shortDescription && <dd>{shortDescription}</dd>}
            </div>
          )
        )}
      </dl>
    </CardText>
  </Card>
)

export default ServiceGroupCard
