import React from 'react'
import { Article, Button, Content } from 'components'
import HighlightSection from 'components/highlight-section'

import datasetData from 'data/dataset.yml'

// TODO: Fix temporal text-center class usage
const DataSetPage = () => (
  <Article>
    <div className="text-center">
      <h1>{datasetData.title}</h1>
      <Content markdown>{datasetData.subtitle}</Content>
    </div>

    {datasetData.sections.map(({ title, content, link, image }) => (
      <HighlightSection image={image} action={link.url} key={title}>
        <h3>
          <Content markdown>{title}</Content>
        </h3>
        <Content markdown>{content}</Content>
        <Button
          outline
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          {link.caption}
        </Button>
      </HighlightSection>
    ))}
  </Article>
)
export default DataSetPage
