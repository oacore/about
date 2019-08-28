import React, { Fragment } from 'react'
import {
  Card,
  CardBody,
  CardImg,
  CardLink,
  CardTitle,
  Col,
  Row,
} from 'reactstrap'
import { Content, Markdown, Page, Section } from 'components'
import {
  title,
  description,
  content,
  keywords,
  outreachMaterials,
  coreAmbassadors,
} from 'data/ambassador.yml'

import './about.scss'

import OutreachMaterials from 'components/outreach-materials'
import TeamMember from 'components/team-member'

import WorldMap from 'components/world-map'
import Pin from 'components/world-map-pin'

const AmbassadorsPage = () => (
  <Page title={title} description={description} keywords={keywords}>
    <h1 className="ambassadors-page-title">
      {title}
      <span className="ambassadors-page-title-small">{description}</span>
    </h1>

    <WorldMap>
      {coreAmbassadors.members.map(member => (
        <Pin
          picture={`/static/images/ambassadors/${member.picture}`}
          latitude={member.location.latitude}
          longitude={member.location.longitude}
        />
      ))}
    </WorldMap>

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
      <h2>{outreachMaterials.title}</h2>
      <Row className="list-unstyled" tag="ul">
        {outreachMaterials.resources.map(resource => (
          <Col
            id={resource.id}
            className="d-flex flex-column"
            sm="6"
            md="4"
            lg="3"
            tag="li"
          >
            <OutreachMaterials
              className="mb-3"
              name={resource.name}
              button={`Open ${resource.type}`}
              picture={`/static/images/resources/${resource.picture}`}
              link={resource.url}
            />
          </Col>
        ))}
      </Row>
    </Section>

    <Section className="ambassadors-section" id="core-ambassadors">
      <h2>{coreAmbassadors.title}</h2>
      <Row className="list-unstyled" tag="ul">
        {coreAmbassadors.members.map(member => (
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
              role={
                <Fragment>
                  {member.role}, {member.organization}
                  <br />
                  {member.country}
                </Fragment>
              }
              picture={`/static/images/ambassadors/${member.picture}`}
            />
          </Col>
        ))}
        <Col className="d-flex flex-column" sm="6" md="4" lg="3" tag="li">
          <Card className="ambassador-new-member mb-3">
            <div className="ambassador-new-member-picture">
              <CardImg src="/static/images/ambassadors/you.png" alt="you" />
            </div>
            <CardBody>
              <CardTitle className="h5 ambassador-you-member-name">
                You?
              </CardTitle>
              <CardLink className="btn btn-primary w-100" href="/about#contact">
                Contact us
              </CardLink>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Section>
  </Page>
)

export default AmbassadorsPage
