import React from 'react'

import MembershipPricesPageTemplate from 'templates/membership/prices'
import textData from 'data/membership.yml'
import { Page } from 'components'

const MembershipFeePage = () => (
  <Page title={textData.header.title} description={textData.header.description}>
    <MembershipPricesPageTemplate data={textData} />
  </Page>
)

export default MembershipFeePage
