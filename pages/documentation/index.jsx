import React from 'react'
import { Row, Col } from 'reactstrap'
import { Article, Content, Section, Button } from 'components'
import documentationData from 'data/documentation.yml'

import './documentation.scss'

const DocumentationPage = () => (
  <Article nav>
    <h1>{documentationData.title}</h1>

    {documentationData.sections.map(documentationGroup => (
      <Section
        key={documentationGroup.id}
        id={documentationGroup.id}
        caption={documentationGroup.title}
      >
        <h2 className="text-center">{documentationGroup.title}</h2>

        {documentationGroup.sections.map(documentation => (
          <Section
            key={documentation.id}
            id={documentation.id}
            className="service-section"
          >
            <Row className="service-section-title" tag="h3">
              <Col sm="6" md="4" tag="span" className="service-section-logo">
                <img
                  src={documentation.logo}
                  alt={`${documentation.title}'s logo`}
                />
              </Col>

              <Col sm="6" md="8" tag="span">
                {documentation.title}
              </Col>
            </Row>

            <Row className="service-section-content">
              <Col sm="6" md="4">
                <figure>
                  <img
                    className="service-section-screenshot"
                    src={documentation.screenshot}
                    alt={`${documentation.title}'s screenshot`}
                  />
                </figure>
              </Col>

              <Col sm="6" md="8">
                <Content
                  markdown
                  id={documentation.description}
                  key={documentation.description}
                >
                  {documentation.description}
                </Content>

                <footer className="service-section-footer">
                  <Button
                    color="primary"
                    outline
                    href={documentation.action.url}
                  >
                    {documentation.action.caption}
                  </Button>
                  <Button color="primary" href={documentation.id}>
                    PDF Download
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

export default DocumentationPage
