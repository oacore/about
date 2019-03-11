import React from 'react'
import { Article, Content } from '../content'

const DocumentationPage = ({ title, content, children }) => (
  <Article>
    <h1>{title}</h1>
    <Content markdown>{children || content}</Content>
  </Article>
)

DocumentationPage.create = (attributes, body) => () => (
  <DocumentationPage {...attributes}>{body}</DocumentationPage>
)

export default DocumentationPage
