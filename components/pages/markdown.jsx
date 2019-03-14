import React from 'react'
import { Article, Content } from '../content'
import Markdown from '../markdown'

const MarkdownPage = ({ title, content, children }) => (
  <Article>
    <h1>{title}</h1>
    <Content>
      <Markdown>{children || content}</Markdown>
    </Content>
  </Article>
)

MarkdownPage.create = ({ attributes, body }) => () => (
  <MarkdownPage {...attributes}>{body}</MarkdownPage>
)

export default MarkdownPage
