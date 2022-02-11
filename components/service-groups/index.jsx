import React from 'react'
import { Row, Col } from 'reactstrap'

import styles from './service-groups.module.scss'
import ServiceGroupCard from '../service-group-card'

const ServiceGroups = ({ items, className = '', ...restProps }) => (
  <Row
    className={`${styles.serviceGroups} ${className}`}
    tag="ul"
    {...restProps}
  >
    {items.map((group) => (
      <Col key={group.id} sm="6" lg="4" tag="li">
        <ServiceGroupCard title={group.title} items={group.features} />
      </Col>
    ))}
  </Row>
)

export default ServiceGroups
