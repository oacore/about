import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import Markdown from '../markdown'
import { Section } from '../content'
import LogosCarousel from '../logos-carousel'
import TestimonialsCarousel from '../testimonials-carousel'
import Link from '../link'

import './endorsements.scss'

const TestimonialsSection = ({
  title,
  items,
  level = 2,
  className = '',
  ...restProps
}) => {
  const Heading = `h${level}`
  return (
    <Section className={`testimonials-section ${className}`} {...restProps}>
      <Heading>{title}</Heading>
      <TestimonialsCarousel items={items} />
    </Section>
  )
}

const EndorsementsSection = ({
  id,
  title,
  description,
  action,
  organizations,
  testimonials,
  level = 2,
  ...restProps
}) => {
  const Heading = `h${level}`
  return (
    <Section id={id} {...restProps}>
      <Heading>{title}</Heading>

      <Row>
        <Col sm="9">
          <Markdown>{description}</Markdown>
          <p className="font-weight-bold">{action.title}</p>
          <Link href={action.url} passHref>
            <Button color="primary">{action.name}</Button>
          </Link>
        </Col>
        <Col sm="3">
          <LogosCarousel items={organizations} />
        </Col>
      </Row>

      <TestimonialsSection
        title={testimonials.title}
        items={testimonials.items.map(item => ({
          ...item,
          author: {
            ...item.author,
            picture: 'https://placehold.it/200x200',
          },
        }))}
        level={level + 1}
      />
    </Section>
  )
}

export default EndorsementsSection
