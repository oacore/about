import React from 'react'

import GovernanceSupportersPageTemplate from '../../templates/governance/supporters'

import retrieveContent from 'content'
import { countries } from 'data/countries.yml'
import apiRequest from 'api'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.includes('/images'))
      object[key] = ASSETS_BASE_URL + value
    else if (typeof value === 'object') setAssetsUrl(value) // Recursively process nested objects
  })
}

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('board-supporters', {
    ref,
    transform: 'object',
  })

  Object.values(content).forEach((section) => {
    setAssetsUrl(section)
    if (section.items) setAssetsUrl(section.items)
  })

  return content
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const sections = await getSections({ ref })
  const data = { ...sections }

  const { data: apiData } = await apiRequest('/members')
  const members = apiData.map((item) => {
    if (item.country_code) {
      item.country = countries.find(
        (country) =>
          country.code.toLowerCase() === item.country_code.toLowerCase()
      )?.name
    } else item.country = ''

    return item
  })

  const filtered = members.filter(
    (member) =>
      member.billing_type !== 'starting' &&
      !member.organisation_name.toLowerCase().includes('test')
  )

  return {
    props: {
      data,
      members: filtered,
    },
  }
}
const GovernanceSupportersPage = ({ members, data }) => (
  <GovernanceSupportersPageTemplate members={members} {...data} />
)
export default GovernanceSupportersPage
