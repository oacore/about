import React, { Component } from 'react'
import { Card, CardTitle, CardText, Row, Col, Spinner } from 'reactstrap'
import { bind } from 'decko'
import Fuse from 'fuse.js'
import Link from '../link'
import Pagination from '../pagination'
import RepositorySearch from '../repositories-search'

class RepositoryBrowser extends Component {
  static searchOptions = {
    threshold: 0.2,
    location: 10,
    distance: 300,
    maxPatternLength: 100,
    keys: ['name', 'repositoryLocation.countryName'],
  }

  static pageSize = 10

  static fetchRepositories(url) {
    return fetch(url)
      .then(res => {
        if (res.ok) return res.json()
        throw new Error(`Error loading repositories from ${url}`)
      })
      .then(repositories =>
        repositories.filter(({ name }) => name && name !== 'name')
      )
  }

  state = {
    items: [],
    filterQuery: '',
    currentPage: 0,
    isFetching: true,
  }

  async componentDidMount() {
    const { endpoint } = this.props
    const repositories = await RepositoryBrowser.fetchRepositories(endpoint)
    repositories.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    this.repositories = new Fuse(repositories, RepositoryBrowser.searchOptions)
    this.setState({
      items: this.repositories.list.slice(),
      isFetching: false,
    })
  }

  @bind
  filter(event) {
    const filterQuery = event.target.value
    const items = filterQuery
      ? this.repositories.search(filterQuery)
      : this.repositories.list.slice()
    this.setState({
      items,
      filterQuery: event.target.value,
      currentPage: 0,
    })
  }

  @bind
  paginate(event, pageIndex) {
    event.preventDefault()
    this.setState({
      currentPage: pageIndex,
    })
  }

  render() {
    const { pageSize } = RepositoryBrowser
    const { className, tag: Tag = 'div' } = this.props
    const { items, isFetching, filterQuery, currentPage } = this.state
    const pageCount = Math.ceil(items.length / pageSize)
    const page = items.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    )

    if (isFetching)
      return <Spinner color="primary" className="d-block mx-auto" />

    const maxQueryLength = this.repositories.options.maxPatternLength
    const itemsCount = this.repositories.list.length

    return (
      <Tag className={className}>
        <RepositorySearch
          id="repositories-filter"
          className="mb-3"
          label="Filter by"
          placeholder="repository name or country"
          value={filterQuery}
          maxLength={maxQueryLength}
          onChange={this.filter}
        />
        {filterQuery ? (
          <p>
            Showing <b>{items.length}</b>&nbsp;repositories from {itemsCount}
            &nbsp;repositories in total:
          </p>
        ) : (
          <p>Showing {itemsCount}&nbsp;repositories:</p>
        )}

        <Row className="mb-4">
          {page.map(item => (
            <Col
              lg="6"
              className="mb-3 d-flex align-items-stretch"
              key={item.id}
            >
              <Card body className="data-providers-card">
                <CardTitle>
                  <Link href={`~search?q=repositories.id:${item.id}`}>
                    {item.name || 'No name repository'}
                  </Link>
                </CardTitle>

                <CardText className="font-italic">
                  {item.repositoryLocation &&
                    item.repositoryLocation.countryName}
                </CardText>
              </Card>
            </Col>
          ))}
        </Row>

        <Pagination
          current={currentPage}
          total={pageCount}
          onPaginate={this.paginate}
        />
      </Tag>
    )
  }
}

export default RepositoryBrowser
