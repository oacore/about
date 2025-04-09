import React from 'react'

import { Page } from '../../components'
import DataAvailabilityPageTemplate from '../../templates/data-availability'
import { getSections } from '../../hooks/retriveContent'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('das', { ref })

  return {
    props: {
      page,
    },
  }
}

const DataAvailabilityPage = ({ page }) => (
  <Page
    title={page.header.header.title}
    description={page.header.header.description}
  >
    <DataAvailabilityPageTemplate data={page} />
  </Page>
)

export default DataAvailabilityPage
