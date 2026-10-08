import React from 'react'

import { Page } from '../../components'
import ModernSlaveryPageTemplate from '../../templates/modern-slavery'
import retrieveContent from '../../content'

const getSections = async ({ ref } = {}) => {
  const page = await retrieveContent('modern-slavery', {
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

const ModernSlaveryPage = ({ page }) => (
  <Page title={page.header.title} description={page.header.description}>
    <ModernSlaveryPageTemplate data={page} />
  </Page>
)

export default ModernSlaveryPage
