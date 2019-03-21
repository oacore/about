import React from 'react'
import {
  Button,
  Link,
  Article,
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
  <Article container>
    <h1 className="mb-5">{repositoriesData.title}</h1>
    <Content>
      <Markdown>
        {patchStats(repositoriesData.content, repositoriesData.statistics)}
      </Markdown>
    </Content>

    <Link href="~about#contact" passHref>
      <Button color="primary" tag="a">
        {repositoriesData.become}
      </Button>
    </Link>

    <Section id="map">
      <h2>{repositoriesData.map}</h2>
      <RepositoriesMap endpoint={repositoriesUrl} />
    </Section>

    <Section id="list">
      <h2>{repositoriesData.filter}</h2>
      <RepositoriesBrowser endpoint={repositoriesUrl} />
    </Section>
  </Article>
)

export default DataProvidersPage
export { repositoriesUrl }
