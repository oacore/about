import React from 'react'
import { Article, Content } from '../content'

const MarkdownPage = ({ title, content, children }) => (
  <Article>
    <h1>{title}</h1>
    <Content markdown>{children || content}</Content>
  </Article>
)

MarkdownPage.create = ({ attributes, body }) => () => (
  <MarkdownPage {...attributes}>{body}</MarkdownPage>
)

export default MarkdownPage
