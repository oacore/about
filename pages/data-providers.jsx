import React from 'react'
import { Button } from 'reactstrap'
import { Article, Content, Section } from 'components'
import Link from 'components/link'
import RepositoriesMap from 'components/repositories-map'
import RepositoryBrowser from 'components/repositories-browser'

import repositoriesData from 'data/data-providers.yml'

const repositoriesUrl = 'https://core.ac.uk/repositories/locations'

const DataProvidersPage = () => (
  <Article container>
    <h1 className="mb-5">{repositoriesData.title}</h1>
    <Content markdown>{repositoriesData.content}</Content>

    <div className="text-center">
      <Link href="~about#contact" passHref>
        <Button color="primary" tag="a">
          {repositoriesData.become}
        </Button>
      </Link>
    </div>

    <Section id="map">
      <h2>{repositoriesData.map}</h2>
      <RepositoriesMap endpoint={repositoriesUrl} />
    </Section>

    <RepositoryBrowser endpoint={repositoriesUrl} />
  </Article>
)

export default DataProvidersPage
export { repositoriesUrl }
