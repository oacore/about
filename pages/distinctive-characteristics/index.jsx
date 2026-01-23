import React from 'react'

import DistinctiveCharacteristicsTemplate from '../../templates/distinctive-characteristics'
import { getSections } from '../../hooks/retriveContent'
import { Page } from '../../components'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('distinctive-characteristics', { ref })

  return {
    props: {
      page,
    },
  }
}

const DistinctiveCharacteristicsPage = ({ page }) => (
  <Page title={page.title} description={page.description}>
    <DistinctiveCharacteristicsTemplate data={page} />
  </Page>
)

export default DistinctiveCharacteristicsPage
