import React from 'react'

import Advisory from '../../templates/governance/advisory'

import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) =>
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.includes('/images'))
      object[key] = ASSETS_BASE_URL + value
  })

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('advisory', {
    ref,
    transform: 'object',
  })

  Object.values(content).forEach((section) => {
    setAssetsUrl(section)
    if (section.box) setAssetsUrl(section.box)
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

const AdvisoryPage = ({ data }) => <Advisory {...data} />

export default AdvisoryPage
