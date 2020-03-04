import React from 'react'

import { Page, Button, Markdown, HighlightSection } from 'components'
import { patchStats } from 'components/utils'
import datasetData from 'data/data.yml'

// TODO: Fix temporal text-center class usage
const DataPage = () => (
  <Page
    title={datasetData.title}
    description={datasetData.description}
    keywords={datasetData.keywords}
  >
    <div className="text-center">
      <h1>{datasetData.headline}</h1>
      <Markdown>{datasetData.tagline}</Markdown>
    </div>

    {datasetData.sections.map(({ title, content, link, image }) => (
      <HighlightSection image={image} action={link.url} key={title}>
        <h3>
          <Markdown>{patchStats(title, datasetData.statistics)}</Markdown>
        </h3>
        <Markdown>{patchStats(content, datasetData.statistics)}</Markdown>
        <Button outline href={link.url} color="primary">
          {link.caption}
        </Button>
      </HighlightSection>
    ))}
  </Page>
)
export default DataPage
