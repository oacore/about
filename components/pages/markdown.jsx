import React from 'react'
import { Container as BootstrapContainer } from 'reactstrap'

import Page from '../page'
import { Content } from '../content'
import Markdown from '../markdown'

// Since Page which is currently based on Article assumes that the content is
// constructed from sections (with containers inside), we add a container to fix
// the spacing
const MarkdownPage = ({ title, description, keywords, content, children }) => (
  <Page title={title} description={description} keywords={keywords}>
    <h1 className="display">{title}</h1>
    <BootstrapContainer>
      <Content>
        <Markdown>{children || content}</Markdown>
      </Content>
    </BootstrapContainer>
  </Page>
)

MarkdownPage.create = ({ attributes, body }) => () => (
  <MarkdownPage {...attributes}>{body}</MarkdownPage>
)

export default MarkdownPage
