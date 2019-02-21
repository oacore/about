import React from 'react'
import { Row, Col } from 'reactstrap'
import { Article, Content, Section, Button } from 'components/index'
import freeData from 'data/free-package-page.yml'

import './free.scss'

const ServicesPage = () => (
  <Article nav>
    <h1>{freeData.title}</h1>

    {freeData.sections.map(freeGroup => (
      <Section key={freeGroup.id} id={freeGroup.id} caption={freeGroup.title}>
        <h2 className="text-center">{freeGroup.title}</h2>

        {freeGroup.sections.map(free => (
          <Section key={free.id} id={free.id} className="free-section">
            <Row className="free-section-title" tag="h3">
              <Col sm="6" md="4" tag="span" className="free-section-logo">
                <img src={free.logo} alt={`${free.title}'s logo`} />
              </Col>

              <Col sm="6" md="8" tag="span">
                {free.title}
              </Col>
            </Row>

            <Row className="free-section-content">
              <Col sm="6" md="4">
                <figure>
                  <img
                    className="free-section-screenshot"
                    src={free.screenshot}
                    alt={`${free.title}'s screenshot`}
                  />
                </figure>
              </Col>

              <Col sm="6" md="8">
                <Content markdown id={free.description} key={free.description}>
                  {free.description}
                </Content>

                <footer className="free-section-footer">
                  <Button color="primary" outline href={free.action.url}>
                    {free.action.caption}
                  </Button>
                  <Button color="primary" href={`~join?free=${free.id}`}>
                    Join CORE for free
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
