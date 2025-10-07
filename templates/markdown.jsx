import React from 'react'
import { Container as BootstrapContainer } from 'reactstrap'
import { useRouter } from 'next/router'

import styles from './markdown.module.scss'

import { Page, Content, Markdown } from 'components'

// Since Page which is currently based on Article assumes that the content is
// constructed from sections (with containers inside), we add a container to fix
// the spacing
const MarkdownPage = ({ data }) => {
  const router = useRouter()
  const { slug } = router.query

  const pageClass = styles[slug] || ''

  return (
    <Page
      title={data.title}
      description={data.description}
      keywords={data.keywords}
      className={pageClass}
    >
      <h1>{data.headline || data.title}</h1>
      <BootstrapContainer>
        <Content>
          <Markdown>{data.body}</Markdown>
        </Content>
      </BootstrapContainer>
    </Page>
  )
}

export default MarkdownPage
