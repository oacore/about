import React from 'react'
import { Page, Content, Markdown } from 'components'

import context from 'data/registration.yml'

const {
  title,
  description,
  keywords,
  content,
} = context.cases.registrationComplete

const CompletePage = () => (
  <Page title={title} description={description} keywords={keywords}>
    <h1>{title}</h1>

    <Content>
      <Markdown>{content}</Markdown>
    </Content>
  </Page>
)

export default CompletePage
