import React from 'react'

import { ResearchPage } from 'templates'
import { Page } from 'components'
import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content'

const Research = ({ data }) => (
  <Page
    title="Research Community"
    description="The CORE Researcher Network provides opportunities for researchers working with CORE data to engage and collaborate with others from within and across disciplines."
    keywords="Researcher Network, Free, Data, Open Access"
  >
    <ResearchPage data={data} />
  </Page>
)

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

const getQuotes = async ({ ref } = {}) => {
  const quote = await retrieveContent('community/quotes', {
    ref,
    transform: 'object',
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

export default Research
