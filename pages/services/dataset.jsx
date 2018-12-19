import React from 'react'
import { Article, Content, Layout } from '../../components'
import HighlightSection from '../../components/highlight-section'
import Link from '../../components/link'

import datasetData from '../../data/dataset.yml'

// TODO: Fix temporal text-center class usage
const DataSetPage = () => (
  <Layout>
    <Article container>
      <div className="text-center">
        <h1>{datasetData.title}</h1>
        <Content markdown>{datasetData.subtitle}</Content>
      </div>

      {datasetData.sections.map(({ title, content, link, image }) => (
        <HighlightSection image={image} key={title}>
          <h3>
            <Content markdown>{title}</Content>
          </h3>
          <Content markdown>{content}</Content>
          <p className="highlight-section-link">
            <Link href={link.url}>{link.caption}</Link>
          </p>
        </HighlightSection>
      ))}
    </Article>
  </Layout>
)
export default DataSetPage
