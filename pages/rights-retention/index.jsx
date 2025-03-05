import React from 'react'

import textData from '../../data/retention.yml'
import { Page } from '../../components'
import RightsRetentionPageTemplate from '../../templates/rights-retention'

const RetentionPage = () => (
  <Page title={textData.header.title} description={textData.header.description}>
    <RightsRetentionPageTemplate data={textData} />
  </Page>
)

export default RetentionPage
