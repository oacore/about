import React from 'react'
import { Page } from 'components'
import { title, description, keywords } from 'data/join.yml'

const JoinPage = () => (
  <Page title={title} description={description} keywords={keywords}>
    <h1>{title}</h1>
  </Page>
)

export default JoinPage
