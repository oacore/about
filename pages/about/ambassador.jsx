import React from 'react'
import { Media } from 'reactstrap'
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
      <Markdown>{coreAmbassadors.content}</Markdown>
    </Section>
  </Page>
)

export default AmbassadorsPage
