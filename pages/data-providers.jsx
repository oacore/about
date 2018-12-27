import React from 'react'
import { Alert, Button } from 'reactstrap'
import { Article, Content, Section } from 'components'
import Link from 'components/link'

import reposData from 'data/repos.yml'

const RepositoryMap = () => (
  <img className="d-block w-100 mb-3" src="/static/images/map.png" alt="" />
)
const RepositoryBrowser = () => (
  <Alert color="secondary">Repository filter goes here...</Alert>
)

const DataProvidersPage = () => (
  <Article container>
    <h1 className="mb-5">{reposData.title}</h1>
    <Content markdown>{reposData.content}</Content>

    <Section id="repositories" className="explore-repositories">
      <h2>{reposData.explore}</h2>
      <RepositoryBrowser />
    </Section>

    <Section id="map">
      <h2>{reposData.map}</h2>
      <RepositoryMap />
    </Section>

    <div className="text-center">
      <Link href="~home" passHref>
        <Button color="primary" tag="a">
          {reposData.become}
        </Button>
      </Link>
    </div>
  </Article>
)

export default DataProvidersPage
