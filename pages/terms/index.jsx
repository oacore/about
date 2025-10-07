import React from 'react'

import { Page } from '../../components'
import TermsPageTemplate from '../../templates/term'
import retrieveContent from '../../content'

const getSections = async ({ ref } = {}) => {
  const page = await retrieveContent('terms-conditions', {
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

const TermsPage = ({ page }) => (
  <Page title={page.header.title} description={page.header.description}>
    <TermsPageTemplate data={page} />
  </Page>
)

export default TermsPage
