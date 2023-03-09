import React from 'react'

import { Page, Markdown, HighlightSection } from 'components'
import { patchStats } from 'components/utils'
import datasetData from 'data/data.yml'
import { Layout } from 'design-v2/components'

// TODO: Fix temporal text-center class usage
const DataPage = () => (
  <Page
    title={datasetData.title}
    description={datasetData.description}
    keywords={datasetData.keywords}
  >
    <Layout>
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
        </HighlightSection>
      ))}
    </Layout>
  </Page>
)
export default DataPage
