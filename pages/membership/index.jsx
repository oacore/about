import React from 'react'

import apiRequest from '../../api'

import { Page } from 'components'
import { countries } from 'data/countries.yml'
import MembershipPageTemplate from 'templates/membership'
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
  const page = await retrieveContent('membership', {
    ref,
    transform: 'object',
  })

  setAssetsUrl(page)

  return page
}

const MembershipPage = ({ members, page }) => (
  <Page
    title={page.header.header.title}
    description={page.header.header.description}
  >
    <MembershipPageTemplate members={members} data={page} />
  </Page>
)

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections({ ref })

  const { data } = await apiRequest('/members')
  const members = data.map((item) => {
    if (item.country_code) {
      item.country = countries.find(
        (country) =>
          country.code.toLowerCase() === item.country_code.toLowerCase()
      )?.name
    } else item.country = ''

    return item
  })

  const filteredMembers = members.filter(
    (member) =>
      member.billing_type !== 'starting' &&
      !member.organisation_name.toLowerCase().includes('test')
  )

  return {
    props: {
      page,
      members: filteredMembers,
    },
  }
}

export default MembershipPage
