import React from 'react'

import Page from '../page'
import { Content } from '../content'
import Markdown from '../markdown'

const MarkdownPage = ({ title, description, keywords, content, children }) => (
  <Page title={title} description={description} keywords={keywords}>
    <h1>{title}</h1>
    <Content>
      <Markdown>{children || content}</Markdown>
    </Content>
  </Page>
)

MarkdownPage.create = ({ attributes, body }) => () => (
  <MarkdownPage {...attributes}>{body}</MarkdownPage>
)

export default MarkdownPage
