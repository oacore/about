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
          <Col xs="12" lg="9" tag="section">
            <h2 id={sections.id} key={sections.id}>
              {sections.title}
            </h2>

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
      </Section>
    ))}
  </Article>
)

export default ServicesPage
