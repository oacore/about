import React from 'react'

import textData from '../../data/sdg.yml'
import { Page } from '../../components'
import SdgPageTemplate from '../../templates/sdg'

const SdgPage = () => (
  <Page title={textData.header.title} description={textData.header.description}>
    <SdgPageTemplate data={textData} />
  </Page>
)

export default SdgPage
