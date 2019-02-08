import React from 'react'
import { Row, Col } from 'reactstrap'
import { Article, Content, Section, Button } from 'components'
import Link from 'components/link'
import servicesData from 'data/services.yml'

import './services.scss'

const ServicesPage = () => (
  <Article nav tag="main">
    <h1>{servicesData.title}</h1>

    {servicesData.sections.map(sections => (
      <Section
        className="services-section"
        caption={sections.title}
        id={sections.id}
        tag="div"
      >
        <Row>
          <Col xs="12">
            <h2 id={sections.id} key={sections.id} className="text-center">
              {sections.title}
            </h2>

            <Row>
              <Col xs="12" md="5">
                <img
                  className="services-logo d-block ml-md-auto  m-xs-auto my-1"
                  src="/static/images/logos/jisc.svg"
                  alt="Jisc"
                />
                <img
                  className="services-screenshot d-block  ml-md-auto  m-xs-auto w-100"
                  src="/static/images/map.png"
                  alt="map"
                />
              </Col>
              <Col xs="12" sm="7">
                {sections.sections.map(subsections => (
                  <div>
                    <Content
                      className="h3 mt-4"
                      markdown
                      id={subsections.title}
                      key={subsections.title}
                    >
                      {subsections.title}
                    </Content>

                    <Content
                      markdown
                      id={subsections.description}
                      key={subsections.description}
                    >
                      {subsections.description}
                    </Content>

                    <Link href={subsections.action.url} passHref>
                      <Button
                        outline
                        id={subsections.action.caption}
                        key={subsections.action.caption}
                      >
                        {subsections.action.caption}
                      </Button>
                    </Link>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>
    ))}
  </Article>
)

export default ServicesPage
