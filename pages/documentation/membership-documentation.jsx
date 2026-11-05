import React from 'react'

import { Page } from '../../components'
import DocumentationPageTemplate from '../../templates/documentation/membership-documentation'

import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

// Image paths are stored as /images/... in the images list and inside markdown.
// Both have to point at the content site.
const toAssetUrl = (value) =>
  value.replace(/(^|[\s("'=])\/images\//g, `$1${ASSETS_BASE_URL}images/`)

const setAssetsUrl = (value) => {
  if (Array.isArray(value)) {
    value.forEach(setAssetsUrl)
    return
  }
  if (!value || typeof value !== 'object') return

  delete value.membership
  Object.keys(value).forEach((key) => {
    const child = value[key]
    if (typeof child === 'string') value[key] = toAssetUrl(child)
    else setAssetsUrl(child)
  })
}

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
