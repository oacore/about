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
    <h1 className="ambassadors-page-title">
      {title}
      <span className="ambassadors-page-title-small">{description}</span>
    </h1>

    <ImageMap>
      {ambassadors.members.map(member => (
        <ImagePin
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
            id={resource.id}
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
            className="d-flex flex-column"
            sm="6"
            md="4"
            lg="3"
            tag="li"
            key={member.name}
          >
            <TeamMember
              id={member.id}
              className="mb-3"
              name={member.name}
              role={member.role}
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
