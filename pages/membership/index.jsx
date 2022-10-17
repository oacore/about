import React from 'react'

import { Page } from 'components'
import textData from 'data/membership.yml'
import MembershipPageTemplate from 'templates/membership'
import {useStore} from "../../store";
import {useRouter} from "next/router";

const MembershipPage = () => {
  const { membership } = useStore()
  const router = useRouter()

  return (
    <Page title={textData.header.title} description={textData.header.description}>
      <MembershipPageTemplate data={textData} membership={membership} router={router} />
    </Page>
  )
}
export default MembershipPage
