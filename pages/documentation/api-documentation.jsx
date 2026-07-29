import React from 'react'

import { Page } from '../../components'
import ApiDocumentationPageTemplate from '../../templates/documentation/api-documentation'

import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (items) =>
  items.forEach((item) => {
    delete item.membership
    if (item.images) {
      item.images.forEach((img) => {
        img.file = ASSETS_BASE_URL + img.file
      })
    }
    if (item.children?.length) setAssetsUrl(item.children)
  })

const flattenDocItems = (items) =>
  items?.flatMap((entry) =>
    entry.children?.length ? entry.children : [entry]
  ) ?? []

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('docs-graph', {
    ref,
    transform: 'object',
  })

  delete content.headerDashboard
  Object.values(content).forEach((section) => {
    if (section.items) {
      setAssetsUrl(section.items)
      section.items = flattenDocItems(section.items)
    }
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
  <Page
    title={data.meta.title}
    description={data.meta.description || data.meta.tagline}
  >
    <ApiDocumentationPageTemplate {...data} />
  </Page>
)

export default DocumentationPage
