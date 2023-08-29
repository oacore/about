import React from 'react'

import apiRequest from '../../api'

import { Page } from 'components'
import { countries } from 'data/countries.yml'
import textData from 'data/membership.yml'
import MembershipPageTemplate from 'templates/membership'

const MembershipPage = ({ members }) => (
  <Page title={textData.header.title} description={textData.header.description}>
    <MembershipPageTemplate members={members} data={textData} />
  </Page>
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

export default MembershipPage
