import React from 'react'

import {Page} from 'components'
import textData from 'data/membership.yml'
import MembershipPageTemplate from 'templates/membership'

const MembershipPage = () => (
  <Page title={textData.header.title} description={textData.header.description}>
    <MembershipPageTemplate data={textData}/>
  </Page>
)

export default MembershipPage
