import React from 'react'

import { Page } from '../../components'
import SponsorshipPageTemplate from '../../templates/sponsorships'

import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.includes('/images'))
      object[key] = ASSETS_BASE_URL + value
    else if (typeof value === 'object') setAssetsUrl(value)
  })
}

const getSections = async ({ ref } = {}) => {
  const page = await retrieveContent('sponsorship', {
    ref,
    transform: 'object',
  })

  const membership = await retrieveContent('membership', {
    ref,
    transform: 'object',
  })

  setAssetsUrl(page)
  setAssetsUrl(membership)

  return { page, membership }
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const { page, membership } = await getSections({ ref })

  return {
    props: {
      page,
      membership,
    },
  }
}

const SponsorshipPage = ({ page, membership }) => (
  <Page
    title={page.header.header.title}
    description={page.header.header.description}
  >
    <SponsorshipPageTemplate membership={membership} data={page} />
  </Page>
)

export default SponsorshipPage
