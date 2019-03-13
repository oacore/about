import React from 'react'
import { Article } from '../content'
import Markdown from '../markdown'

const MarkdownPage = ({ title, content, children }) => (
  <Article>
    <h1>{title}</h1>
    <Markdown>{children || content}</Markdown>
  </Article>
)

MarkdownPage.create = ({ attributes, body }) => () => (
  <MarkdownPage {...attributes}>{body}</MarkdownPage>
)

export default MarkdownPage
