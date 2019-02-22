import React from 'react'
import { Button } from 'reactstrap'
import { Article, Content, Section } from 'components'
import Link from 'components/link'
import RepositoriesMap from 'components/repositories-map'
import RepositoryBrowser from 'components/repositories-browser'

import repositoriesData from 'data/data-providers.yml'

const repositoriesUrl = 'https://api.core.ac.uk/internal/repositories/formap'

const DataProvidersPage = () => (
  <Article container>
    <h1 className="mb-5">{repositoriesData.title}</h1>
    <Content markdown>{repositoriesData.content}</Content>

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
      <RepositoryBrowser endpoint={repositoriesUrl} />
    </Section>
  </Article>
)

export default DataProvidersPage
export { repositoriesUrl }
