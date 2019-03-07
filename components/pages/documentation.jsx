import React from 'react'
import { Article, Content } from '../content'

const DocumentationPage = ({ title, content }) => (
  <Article nav>
    <h1>Documentation</h1>
    <h2>
      <Content markdown>{title}</Content>
    </h2>
    <p>
      <Content markdown>{content}</Content>
    </p>
  </Article>
)

DocumentationPage.create = (pageContext, packageContext) => () => (
  <DocumentationPage freePackage={packageContext} {...pageContext} />
)

export default DocumentationPage
