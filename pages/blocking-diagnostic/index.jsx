import React from 'react'

import diagnosticData from '../../templates/blocking-diagnostic/diagnostic.yml'
import BlockingDiagnosticPageTemplate from '../../templates/blocking-diagnostic'

import { Page } from 'components'

const BlockingDiagnosticPage = () => (
  <Page
    title={diagnosticData.meta.title}
    description={diagnosticData.meta.description}
    keywords={diagnosticData.meta.keywords}
  >
    <BlockingDiagnosticPageTemplate data={diagnosticData} />
  </Page>
)

export default BlockingDiagnosticPage
