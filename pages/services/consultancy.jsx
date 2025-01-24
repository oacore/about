import React from 'react'

import { ServicePage } from 'design-v2/components'
import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.includes('/images'))
      object[key] = ASSETS_BASE_URL + value
    else if (typeof value === 'object') setAssetsUrl(value) // Recursively process nested objects
  })
}

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('consultancy', {
    ref,
    transform: 'object',
  })

  setAssetsUrl(content)

  return content
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const data = await getSections({ ref })

  return {
    props: {
      data,
    },
  }
}

const ConsultancyPage = ({ data }) => {
  const Component = ServicePage.create(data)
  return <Component />
}

export default ConsultancyPage
