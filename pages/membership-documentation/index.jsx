import React, { useState } from 'react'

import DocumentationPageTemplate from '../../templates/membership-documentation'

import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const DocumentationPage = ({ ...props }) => {
  const [stateData, setStateData] = useState({})

  const setAssetsUrl = (object) => {
    Object.entries(object).forEach(([, value]) => {
      delete value.membership
      if (value.images) {
        Object.entries(value.images).forEach(([, item]) => {
          item.file = ASSETS_BASE_URL + item.file
        })
      }
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
  if (Object.getOwnPropertyNames(stateData).length === 0) {
    getSections().then((val) => {
      setStateData(val)
    })
    return <></>
  }
  return <DocumentationPageTemplate {...props} {...stateData} />
}

export default DocumentationPage
