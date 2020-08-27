import React from 'react'

import {
  Button,
  Page,
  Section,
  Markdown,
  Content,
  RepositoriesMap,
  RepositoriesBrowser,
} from 'components'
import { patchStats } from 'components/utils'
import repositoriesData from 'data/data-providers.yml'

const repositoriesUrl = 'https://api.core.ac.uk/internal/repositories/formap'

const DataProvidersPage = () => (
  <Page
    title={repositoriesData.title}
    description={repositoriesData.description}
    keywords={repositoriesData.keywords}
    nav
  >
    <h1 className="page-title">{repositoriesData.title}</h1>
    <div className="container">
      <Content className="content">
        <Markdown>
          {patchStats(repositoriesData.content, repositoriesData.statistics)}
        </Markdown>

        <Button color="primary" href="~register-data-provider">
          {repositoriesData.become}
        </Button>
      </Content>
    </div>

    <Section id="map" caption={repositoriesData.map}>
      <h2>{repositoriesData.map}</h2>
      <RepositoriesMap endpoint={repositoriesUrl} />
    </Section>

    <Section id="list" caption={repositoriesData.filter}>
      <h2>{repositoriesData.filter}</h2>
      <RepositoriesBrowser endpoint={repositoriesUrl} />
    </Section>
  </Page>
)

export default DataProvidersPage
export { repositoriesUrl }
