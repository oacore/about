import React from 'react'
import { Button } from 'reactstrap'
import { Article, Content, Section } from 'components'
import Link from 'components/link'
import RepositoryMap from 'components/repositories-map'
import RepositoryBrowser from 'components/repositories-browser'

import repositoriesData from 'data/data-providers.yml'

const DataProvidersPage = () => (
  <Article container>
    <h1 className="mb-5">{repositoriesData.title}</h1>
    <Content markdown>{repositoriesData.content}</Content>

    <div className="text-center">
      <Link href="~home" passHref>
        <Button color="primary" tag="a">
          {repositoriesData.become}
        </Button>
      </Link>
    </div>

    <Section id="map">
      <h2>{repositoriesData.map}</h2>
      <RepositoryMap />
    </Section>

    <RepositoryBrowser endpoint="https://core.ac.uk/repositories/locations" />
  </Article>
)

export default DataProvidersPage
