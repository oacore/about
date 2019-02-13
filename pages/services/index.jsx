import React from 'react'
import { Row, Col } from 'reactstrap'
import { Article, Content, Section, Button } from 'components'
import Link from 'components/link'
import servicesData from 'data/services.yml'

import './services.scss'

const ServicesPage = () => (
  <Article nav>
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

            {sections.sections.map(subsections => (
              <div className="my-5">
                <Row className="my-3">
                  {/* <Col xs="4" md="5" lg="4"> */}
                  <Col xs="4" sm="6">
                    <img
                      className="services-logo"
                      src={subsections.logo}
                      alt="Logo"
                    />
                  </Col>

                  {/* <Col xs="8"  md="7" lg="8"> */}
                  <Col xs="8" sm="6">
                    <Content
                      className="h3 services-logo-text"
                      markdown
                      id={subsections.title}
                      key={subsections.title}
                    >
                      {subsections.title}
                    </Content>
                  </Col>
                </Row>

                <Row className="service-row-reverse">
                  {/* <Col md="5" lg="4"> */}
                  <Col sm="6">
                    <img
                      className="services-screenshot w-100"
                      src={subsections.screenshot}
                      alt=""
                    />
                  </Col>

                  {/* <Col md="7" lg="8"> */}
                  <Col sm="6">
                    <div className="mb-5">
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
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </Section>
    ))}
  </Article>
)

export default ServicesPage
