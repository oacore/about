import React from 'react'

import textData from '../../data/retention.yml'
import { Page } from '../../components'
import DataAvailabilityPageTemplate from '../../templates/data-availability'

const DataAvailabilityPage = () => (
  <Page title={textData.header.title} description={textData.header.description}>
    <DataAvailabilityPageTemplate data={textData} />
  </Page>
)

export default DataAvailabilityPage
