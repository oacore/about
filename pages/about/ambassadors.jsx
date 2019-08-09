import React from 'react'
import { Col, Row } from 'reactstrap'
import {
  Content,
  Markdown,
  Page,
  Section,
  Button,
  OutreachMaterials,
  TeamMember,
  ImageMap,
  ImagePin,
} from 'components'
import {
  title,
  description,
  content,
  keywords,
  ambassadors,
} from 'data/ambassadors.yml'
import { resources } from 'data/resources.yml'

import './about.scss'

const AmbassadorsPage = () => (
  <Page title={title} description={description} keywords={keywords}>
    <header>
      <h1 className="text-center">{title}</h1>

      <p className="text-center lead">{description}</p>

      <ImageMap>
        {ambassadors.members.map(member => (
          <ImagePin
            key={member.id}
            latitude={member.location.latitude}
            longitude={member.location.longitude}
            src={
              member.picture
                ? `/static/images/people/${member.picture}`
                : '/static/images/unknown.svg'
            }
            alt={`${member.name}, ${member.country}`}
            href={`#${member.id}`}
            title={`${member.name}, ${member.country}`}
            tag="a"
          />
        ))}
      </ImageMap>
    </header>

    <Section id="ambassadors-description">
      <Row>
        <Col>
          <Content>
            <Markdown>{content}</Markdown>
          </Content>
        </Col>
      </Row>
    </Section>

    <Section className="outreach-materials-section" id="outreach-materials">
      <h2>{resources.title}</h2>
      <Row className="list-unstyled" tag="ul">
        {resources.resources.map(resource => (
          <Col
            key={resource.id}
            className="d-flex flex-column"
            sm="6"
            md="4"
            lg="3"
            tag="li"
          >
            <OutreachMaterials
              id={resource.id}
              className="mb-3"
              name={resource.name}
              format={resource.type}
              picture={
                resource.picture &&
                `/static/images/resources/${resource.picture}`
              }
              link={resource.url}
            />
          </Col>
        ))}
      </Row>
    </Section>

    <Section className="ambassadors-section" id="core-ambassadors">
      <h2>{ambassadors.title}</h2>

      <Row className="list-unstyled" tag="ul">
        {ambassadors.members.map(member => (
          <Col
            key={member.id}
            className="d-flex flex-column"
            sm="6"
            md="4"
            lg="3"
            tag="li"
          >
            <TeamMember
              id={member.id}
              className="mb-3"
              name={member.name}
              role={member.country}
              picture={
                member.picture && `/static/images/people/${member.picture}`
              }
            />
          </Col>
        ))}

        <Col className="d-flex flex-column" sm="6" md="4" lg="3" tag="li">
          <TeamMember
            name="You?"
            picture="/static/images/unknown-question-mark.svg"
            className="mb-3"
          >
            <Button block href="~contact">
              Contact us
            </Button>
          </TeamMember>
        </Col>
      </Row>
    </Section>
  </Page>
)

export default AmbassadorsPage
