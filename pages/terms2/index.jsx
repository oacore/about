import React from 'react'

import textData from '../../data/terms.yml'
import { Page } from '../../components'
import TermsPageTemplate from '../../templates/term'

const TermsPage2 = () => (
  <Page title={textData.header.title} description={textData.header.description}>
    <TermsPageTemplate data={textData} />
  </Page>
)

export default TermsPage2
