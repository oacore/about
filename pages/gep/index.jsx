import React from 'react'

import { Page } from '../../components'
import GepPageTemplate from '../../templates/gep'
import retrieveContent from '../../content'

const getSections = async ({ ref } = {}) => {
  const page = await retrieveContent('gep', {
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

const GepPage = ({ page }) => (
  <Page title={page.header.title} description={page.header.description}>
    <GepPageTemplate data={page} />
  </Page>
)

export default GepPage
