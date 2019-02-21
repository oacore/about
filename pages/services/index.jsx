import React from 'react'
import { Row, Col } from 'reactstrap'
import { Article, Content, Section, Button } from 'components'
import servicesData from 'data/services.yml'

import './services.scss'

const ServicesPage = () => (
  <Article nav className="services-page">
    <h1 className="services-page-title">
      <span className="services-page-title-small">
        Join for <b>free</b> today, to use our
      </span>
      powerful services
    </h1>
    {servicesData.sections.map(servicesGroup => (
      <Section
        key={servicesGroup.id}
        id={servicesGroup.id}
        caption={servicesGroup.title}
      >
        <h2 className="text-center">{servicesGroup.title}</h2>

        {servicesGroup.sections.map(service => (
          <Section key={service.id} id={service.id} className="service-section">
            <Row className="service-section-title" tag="h3">
              <Col sm="6" md="4" tag="span" className="service-section-logo">
                <img src={service.logo} alt={`${service.title}'s logo`} />
              </Col>

              <Col sm="6" md="8" tag="span">
                {service.title}
              </Col>
            </Row>

            <Row className="service-section-content">
              <Col sm="6" md="4">
                <figure>
                  <img
                    className="service-section-screenshot"
                    src={service.screenshot}
                    alt={`${service.title}'s screenshot`}
                  />
                </figure>
              </Col>

              <Col sm="6" md="8">
                <Content
                  markdown
                  id={service.description}
                  key={service.description}
                >
                  {service.description}
                </Content>

                <footer className="service-section-footer">
                  <Button color="primary" outline href={service.action.url}>
                    {service.action.caption}
                  </Button>
                </footer>
              </Col>
            </Row>
          </Section>
        ))}
      </Section>
    ))}
  </Article>
)

export default ServicesPage
