import React from 'react'
import { Container as BootstrapContainer } from 'reactstrap'

import { Page, Content, Markdown } from 'components'

// Since Page which is currently based on Article assumes that the content is
// constructed from sections (with containers inside), we add a container to fix
// the spacing
const MarkdownPage = ({ data }) => (
  <Page
    title={data.title}
    description={data.description}
    keywords={data.keywords}
  >
    <h1>{data.headline || data.title}</h1>
    <BootstrapContainer>
      <Content>
        <Markdown>{data.body}</Markdown>
      </Content>
    </BootstrapContainer>
  </Page>
)

export default MarkdownPage
