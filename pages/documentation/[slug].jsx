import React from 'react'
import { Container as BootstrapContainer } from 'reactstrap'

import { Page, Content, Markdown } from 'components'
import retrieveContent from 'content'

// Since Page which is currently based on Article assumes that the content is
// constructed from sections (with containers inside), we add a container to fix
// the spacing
const PureMarkdownPage = ({ data }) => (
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

const PAGES_BASE = 'docs'

async function getStaticProps({ params, previewData }) {
  const ref = previewData?.ref
  const { slug } = params

  const filepath = `${PAGES_BASE}/${slug}.md`
  const data = await retrieveContent(filepath, { ref })

  return {
    props: {
      data,
    },
  }
}

async function getStaticPaths() {
  const pages = await retrieveContent(PAGES_BASE)

  const paths = pages.map(({ id }) => ({
    params: { slug: id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default PureMarkdownPage
export { getStaticProps, getStaticPaths }
