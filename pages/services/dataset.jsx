import React from 'react'

import statistics from 'data/services/dataset.yml'
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
  const page = await retrieveContent('datasets', {
    ref,
    transform: 'object',
  })

  setAssetsUrl(page)

  return { ...page, statistics }
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections({ ref })

  return {
    props: {
      page,
    },
  }
}

const ServicePageWrapper = ({ page }) => {
  const ServicePageComponent = ServicePage.create(page)
  return <ServicePageComponent />
}

export default ServicePageWrapper
