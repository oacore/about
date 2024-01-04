import React from 'react'

import BenefitsPageTemplate from '../design-v2/benefits'
import retrieveContent from '../content'

import { Page } from 'components'
import benefitsData from 'data/benefits.yml'

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('faqs', {
    ref,
    transform: 'object',
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

const benefitsPage = ({ data }) => (
  <Page
    title={benefitsData.title}
    description={benefitsData.description}
    keywords={benefitsData.keywords}
  >
    <BenefitsPageTemplate data={data} />
  </Page>
)

export default benefitsPage
