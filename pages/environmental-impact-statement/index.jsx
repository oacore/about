import React from 'react'

import { Page } from '../../components'
import retrieveContent from '../../content'
import EnvironmentalPageTemplate from '../../templates/environmental-impact-statement'

const getSections = async ({ ref } = {}) => {
  const page = await retrieveContent('environmental-impact', {
    ref,
    transform: 'object',
  })

  return { page }
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const { page } = await getSections({ ref })

  return {
    props: {
      page,
    },
  }
}

const EnvironmentalPage = ({ page }) => (
  <Page title={page.header.title} description={page.header.description}>
    <EnvironmentalPageTemplate data={page} />
  </Page>
)

export default EnvironmentalPage
