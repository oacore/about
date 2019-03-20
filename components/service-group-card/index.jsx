import React from 'react'
import { Card, CardTitle, CardText } from 'reactstrap'
import { Link } from '../elements'

const ServiceGroupCard = ({ className = '', title, items, ...restProps }) => (
  <Card className={`service-group-card card-body ${className}`} {...restProps}>
    <CardTitle tag="h4">{title}</CardTitle>
    <CardText>
      <dl className="services-group-card-list">
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
