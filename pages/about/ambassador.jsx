import React from 'react'
import { Col, Media, Row } from 'reactstrap'
import { Markdown, Page, Section } from 'components'
import {
  title,
  description,
  keywords,
  atlas,
  outreachMaterials,
  coreAmbassadors,
} from 'data/ambassador.yml'

import './about.scss'
import CoreAmbassadors from '../../components/core-ambassadors'

const AmbassadorsPage = () => (
  <Page title={title} description={description} keywords={keywords}>
    <h1 className="ambassadors-page-title">
      {title}
      <span className="ambassadors-page-title-small">{description}</span>
    </h1>
    <br />
    <Media class="img-fluid" src={atlas.picture} alt={atlas.alt} />

    <Section className="atlas-ambassadors-section" id="atlas">
      <h2>{atlas.title}</h2>

      <Markdown>{atlas.content}</Markdown>
    </Section>

    <Section
      className="outreach-materials-ambassadors-section"
      id="outreach-materials"
    >
      <h2>{outreachMaterials.title}</h2>
      <Markdown>{outreachMaterials.content}</Markdown>
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
            <CoreAmbassadors
              className="mb-3"
              name={member.name}
              role={member.role}
              country={member.country}
              description={member.description}
              button={member.button}
              link={member.link}
              picture={`/static/images/ambassadors/${member.picture}`}
            />
          </Col>
        ))}
      </Row>
    </Section>
  </Page>
)

export default AmbassadorsPage
