import React from 'react'

import { Page } from '../../components'
import DataProviderDocs from '../../templates/documentation/data-providers-guide'

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

const getProviderSections = async ({ ref } = {}) => {
  const content = await retrieveContent('docs-dataProvider', {
    ref,
    transform: 'object',
  })

  Object.values(content).forEach((section) => {
    if (section.items) setAssetsUrl(section.items)
  })
  return content
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const sectionProvider = await getProviderSections({ ref })

  const dataProvider = {
    ...sectionProvider,
  }

  return {
    props: {
      dataProvider,
    },
  }
}

const DocumentationPage = ({ dataProvider }) => (
  <Page>
    <DataProviderDocs {...dataProvider} />
  </Page>
)

export default DocumentationPage
