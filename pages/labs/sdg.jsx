import React from 'react'

import { Page } from '../../components'
import SdgPageTemplate from '../../templates/sdg'
import { getSections } from '../../hooks/retriveContent'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('sdg', { ref })

  return {
    props: {
      page,
    },
  }
}

const SdgPage = ({ page }) => (
  <Page
    title={page.header.header.title}
    description={page.header.header.description}
  >
    <SdgPageTemplate data={page} />
  </Page>
)

export default SdgPage
