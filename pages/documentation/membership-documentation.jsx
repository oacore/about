import React from 'react'

import { Page } from '../../components'
import DocumentationPageTemplate from '../../templates/documentation/membership-documentation'

import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) =>
  Object.entries(object).forEach(([, value]) => {
    delete value.membership
    if (value.images) {
      Object.entries(value.images).forEach(([, item]) => {
        item.file = ASSETS_BASE_URL + item.file
      })
    }
  })

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('docs-membership', {
    ref,
    transform: 'object',
  })

  delete content.headerDashboard
  Object.values(content).forEach((section) => {
    if (section.items) setAssetsUrl(section.items)
  })
  return content
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const sections = await getSections({ ref })
  const data = {
    ...sections,
  }

  return {
    props: {
      data,
    },
  }
}

const DocumentationPage = ({ data }) => (
  <Page title={data.meta.title} description={data.meta.description}>
    <DocumentationPageTemplate {...data} />
  </Page>
)

export default DocumentationPage
