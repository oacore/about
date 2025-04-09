import React from 'react'

import apiRequest from '../../api'
import { getSections } from '../../hooks/retriveContent'

import { Page } from 'components'
import { countries } from 'data/countries.yml'
import MembershipPageTemplate from 'templates/membership'

const MembershipPage = ({ members, page, allMembers }) => (
  <Page
    title={page.header.header.title}
    description={page.header.header.description}
  >
    <MembershipPageTemplate
      members={members}
      allMembers={allMembers}
      data={page}
    />
  </Page>
)

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('membership', { ref })

  const { data } = await apiRequest('/members')
  const members = data.map((item) => {
    if (item.country_code) {
      item.country = countries.find(
        (country) =>
          country.code.toLowerCase() === item.country_code.toLowerCase()
      )?.name
    }
    if (!item.country) item.country = ''

    return item
  })

  const filteredMembers = members.filter(
    (member) =>
      member.billing_type !== 'starting' &&
      member.organisation_name &&
      !member.organisation_name.toLowerCase().includes('test')
  )

  const allMembers = members.filter(
    (member) =>
      member.organisation_name &&
      !member.organisation_name.toLowerCase().includes('test')
  )

  return {
    props: {
      page,
      members: filteredMembers,
      allMembers,
    },
  }
}

export default MembershipPage
