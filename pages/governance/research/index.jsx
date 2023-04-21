import React from 'react'

import { ResearchPage } from 'templates'
import { Page } from 'components'
import retrieveContent from 'content'
import datasetData from 'data/community/research.yml'

const ASSETS_BASE_URL = 'https://oacore.github.io/content'

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('community', {
    ref,
    transform: 'object',
  })

  Object.values(content).forEach((section) => {
    // Resolve paths to absolute URLs **in-place**
    Object.entries(section).forEach(([key, value]) => {
      if (/Url$/.test(key)) section[key] = new URL(value, ASSETS_BASE_URL).href
    })
  })

  return content
}

// TODO: When we will have > 2 quotes add map function.
// Temporary we have only 1 'Hardcoded' quote.
const getQuotes = async ({ ref } = {}) => {
  const quote = await retrieveContent('quote', {
    ref,
  })

  const quoteWithPhoto = {
    ...quote,
    photoUrl: `${ASSETS_BASE_URL}${quote.photo}`,
  }

  return quoteWithPhoto
}

export const getStaticProps = async ({ previewData }) => {
  const ref = previewData?.ref

  const sections = await getSections({ ref })
  const quotes = await getQuotes({ ref })

  const data = {
    ...sections,
    quotes,
  }

  return {
    props: {
      data,
    },
  }
}

const Research = ({ data }) => (
  <Page
    title={datasetData.title}
    description={datasetData.description}
    keywords={datasetData.keywords}
  >
    <ResearchPage data={data} />
  </Page>
)

export default Research
