import React from 'react'

import textData from '../../data/sponsorship.yml'
import { Page } from '../../components'
import SponsorshipPageTemplate from '../../templates/sponsorships'

const SponsorshipPage = () => (
  <Page title={textData.header.title} description={textData.header.description}>
    <SponsorshipPageTemplate data={textData} />
  </Page>
)

export default SponsorshipPage
