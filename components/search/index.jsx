import React from 'react'
import { Button } from 'reactstrap'

import { Content } from '../content'
import { SimpleSearchForm, AdvancedSearchForm } from './forms'

class SearchForm extends React.Component {
  state = {
    toggleAdvancedSearch: false,
  }

  constructor(props) {
    super(props)
    this.toggleSearchComponent = this.toggleSearchComponent.bind(this)
  }

  toggleSearchComponent() {
    this.setState(state => ({
      toggleAdvancedSearch: !state.toggleAdvancedSearch,
    }))
  }

  renderButton() {
    return null

    // TODO: turn on Advanced search form
    // eslint-disable-next-line no-unreachable
    const { toggleAdvancedSearch } = this.state
    const caption = toggleAdvancedSearch ? 'Simple search' : 'Advanced search'
    return (
      <Button color="link" size="sm" onClick={this.toggleSearchComponent}>
        {caption}
      </Button>
    )
  }

  render() {
    const formProps = this.props
    const { toggleAdvancedSearch } = this.state
    if (toggleAdvancedSearch) {
      return (
        <>
          {this.renderButton()}
          <AdvancedSearchForm {...formProps} />
        </>
      )
    }

    return (
      <Content className="mx-auto">
        <SimpleSearchForm {...formProps} />
        {this.renderButton()}
      </Content>
    )
  }
}

export default SearchForm
