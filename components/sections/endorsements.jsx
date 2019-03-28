import React from 'react'
import { Row, Col } from 'reactstrap'
import Markdown from '../markdown'
import { Button } from '../elements'
import { Section } from '../content'
import LogosCarousel from '../logos-carousel'
import TestimonialsCarousel from '../testimonials-carousel'

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
          <Button color="primary" href={action.url}>
            {action.name}
          </Button>
        </Col>
        <Col sm="3">
          <LogosCarousel items={organizations} />
        </Col>
      </Row>

      <TestimonialsSection
        title={testimonials.title}
        items={testimonials.items}
        level={level + 1}
      />
    </Section>
  )
}

export default EndorsementsSection
