import React from 'react'
import { Row, Col } from 'reactstrap'
import {
  Page,
  Content,
  Markdown,
  Section,
  Button,
  Link,
  Video,
} from 'components'
import Testimonial from 'components/testimonial'
import servicesData from 'data/services.yml'

import './services.scss'

const ServicesPage = () => (
  <Page
    title={servicesData.title}
    description={servicesData.description}
    keywords={servicesData.keywords}
    nav
  >
    <h1 className="services-page-title">
      <span className="services-page-title-small">
        {servicesData.headline[0]}
      </span>
      {servicesData.headline[1]}
    </h1>

    {servicesData.testimonial && (
      <Testimonial
        className="my-5"
        content={servicesData.testimonial.content}
        author={servicesData.testimonial.author}
      />
    )}

    {servicesData.sections.map(servicesGroup => (
      <Section
        key={servicesGroup.id}
        id={servicesGroup.id}
        caption={servicesGroup.title}
        className="service-section"
      >
        <h2 className="text-center">{servicesGroup.title}</h2>

        {servicesGroup.video && (
          <Section className="service-section-video" tag="div">
            <Content className="mx-auto" tag="figure">
              <Content tag="figcaption">
                <Markdown>{servicesGroup.video.description}</Markdown>
              </Content>
              <Video
                src={servicesGroup.video.src}
                title={servicesGroup.video.title}
              />
            </Content>
          </Section>
        )}

        {servicesGroup.sections.map(service => (
          <Section key={service.id} id={service.id} className="service-section">
            <Row className="service-section-title" tag="h3">
              <Col sm="6" md="4" tag="span" className="service-section-logo">
                <Link href={service.action.url} passHref>
                  <a href={service.action.url} title={service.action.caption}>
                    <img src={service.logo} alt={`${service.title}'s logo`} />
                  </a>
                </Link>
              </Col>

              <Col sm="6" md="8" tag="span">
                {service.title}
              </Col>
            </Row>

            <Row className="service-section-content">
              <Col sm="6" md="4">
                <figure>
                  <Link href={service.action.url} passHref>
                    <a href={service.action.url} title={service.action.caption}>
                      <img
                        className="service-section-screenshot"
                        src={service.screenshot}
                        alt={`${service.title}'s screenshot`}
                      />
                    </a>
                  </Link>
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
  </Page>
)

export default ServicesPage
