import React, { Component } from 'react'
import { Table, Spinner } from 'reactstrap'
import { bind } from 'decko'
import Fuse from 'fuse.js'
import Pagination from '../pagination'
import RepositorySearch from '../repositories-search'

import './repositories-browser.scss'

class RepositoryBrowser extends Component {
  static searchOptions = {
    keys: ['name'],
  }

  static pageSize = 50

  static fetchRepositories(url) {
    return fetch(url).then(res => res.json())
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
    repositories.sort((a, b) => a.name.localeCompare(b.name))
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

    if (isFetching) {
      return (
        <Spinner
          color="primary"
          className="d-block mx-auto"
          style={{ width: '3rem', height: '3rem' }}
        />
      )
    }

    const maxQueryLength = this.repositories.options.maxPatternLength
    const itemsCount = this.repositories.list.length

    return (
      <Tag className={className}>
        <RepositorySearch
          id="repositories-filter"
          className="mb-3"
          label="Filter by"
          placeholder="e.g. CORE"
          value={filterQuery}
          maxLength={maxQueryLength}
          onChange={this.filter}
        />
        <p>
          Showing <b>{items.length}</b> repositories from {itemsCount}{' '}
          repositories in total:
        </p>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Repository</th>
            </tr>
          </thead>
          <tbody>
            {page.map((item, index) => (
              <tr>
                <th scope="row" className="number-column">
                  {currentPage * pageSize + index + 1}
                </th>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
