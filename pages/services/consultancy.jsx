import React from 'react'

import { ServicePage } from 'design-v2/components'
import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) =>
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.includes('/images'))
      object[key] = ASSETS_BASE_URL + value
  })

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('consultancy', {
    ref,
    transform: 'object',
  })

  Object.values(content).forEach((section) => {
    setAssetsUrl(section)
    // For nesting
    Object.values(section).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          // Exception for testimonials
          if (item.author) setAssetsUrl(item.author)
          setAssetsUrl(item)
        })
      }
    })
  })

  // Check for object duplicate keys
  Object.keys(content).map((key) => {
    if (Object.keys(content[key]).some((childKey) => childKey === key)) {
      if (!content[key].title) content[key] = Object.values(content[key][key])
      else {
        content[key] = {
          title: content[key].title,
          items: Object.values(content[key][key]),
        }
      }
    }
    return key
  })

  return content
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref

  const sections = await getSections({ ref })
  const data = {
    ...sections,
    title: sections.meta.title,
    tagline: sections.meta.tagline,
    relatedServices: {
      ...sections.relatedServices,
      services: sections.relatedServices.items,
    },
    hideButtons: true,
  }

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
