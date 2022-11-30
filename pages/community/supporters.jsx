import React from 'react'

import { countries } from 'data/countries.yml'
import apiRequest from 'api'
import CommunitySupportersPageTemplate from 'templates/community/supporters'
import page from 'data/community/supporters.yml'

const CommunitySupportersPage = ({ members }) => (
  <CommunitySupportersPageTemplate members={members} page={page} />
)

export async function getStaticProps() {
  const { data } = await apiRequest('/members')
  const members = data.map((item) => {
    if (item.country_code) {
      item.country = countries.find(
        (country) =>
          country.code.toLowerCase() === item.country_code.toLowerCase()
      ).name
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
      members: filtered,
    },
  }
}

export default CommunitySupportersPage
