import React from 'react'

import { Page } from '../../components'
import RightsRetentionPageTemplate from '../../templates/rights-retention'
import { getSections } from '../../hooks/retriveContent'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('rrs', { ref })

  return {
    props: {
      page,
    },
  }
}

const RetentionPage = ({ page }) => (
  <Page
    title={page.header.header.title}
    description={page.header.header.description}
  >
    <RightsRetentionPageTemplate data={page} />
  </Page>
)

export default RetentionPage
