import React from 'react'
import {
  Card,
  CardBody,
  CardImg,
  CardLink,
  CardTitle,
  Col,
  Row,
} from 'reactstrap'
import { Page, Section } from 'components'
import {
  title,
  description,
  keywords,
  outreachMaterials,
  coreAmbassadors,
} from 'data/ambassador.yml'

import './about.scss'

import OutreachMaterials from '../../components/outreach-materials'
import TeamMember from '../../components/team-member'

const WorldMap = ({ children }) => <div className="map">{children}</div>

const Pin = ({ latitude, longitude, image }) => {
  const x = 48.8 + (parseFloat(longitude) / 360) * 100
  const y = 53 + (parseFloat(latitude) / 180) * 100

  return (
    <div className="pin" style={{ top: `${y}%`, left: `${x}%` }}>
      <img src={image} alt="pin image2" />
    </div>
  )
}

const AmbassadorsPage = () => (
  <Page title={title} description={description} keywords={keywords}>
    <h1 className="ambassadors-page-title">
      {title}
      <span className="ambassadors-page-title-small">{description}</span>
    </h1>

    <WorldMap>
      <Pin
        latitude="-50.40"
        longitude="30.25"
        image="http://placekitten.com/90/90"
      />
    </WorldMap>

    <Section
      className="outreach-materials-ambassadors-section"
      id="outreach-materials"
    >
      <h2>{outreachMaterials.title}</h2>
      <Row className="list-unstyled" tag="ul">
        {outreachMaterials.materials.map(material => (
          <Col
            className="d-flex flex-column"
            sm="6"
            md="4"
            lg="3"
            tag="li"
            key={material.name}
          >
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <OutreachMaterials
              className="mb-3"
              name={material.name}
              button={material.button}
              link={material.link}
              picture={`/static/images/ambassadors/${material.picture}`}
            />
          </Col>
        ))}
      </Row>
    </Section>

    <Section
      className="core-ambassadors-ambassadors-section"
      id="core-ambassadors"
    >
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
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <TeamMember
              className="mb-3"
              name={member.name}
              role={member.role}
              country={member.country}
              description={member.description}
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
