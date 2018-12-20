import React from 'react'
import Layout from '../layout'
import { Article, Content } from '../content'

const MarkdownPage = ({ title, content, children }) => (
  <Layout>
    <Article container>
      <h1>{title}</h1>
      <Content markdown>{children || content}</Content>
    </Article>
  </Layout>
)

MarkdownPage.create = ({ attributes, body }) => () => (
  <MarkdownPage {...attributes}>{body}</MarkdownPage>
)

export default MarkdownPage
