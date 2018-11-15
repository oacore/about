import React from 'react'
import { Button } from 'reactstrap'
import { SimpleSearchForm, AdvancedSearchForm } from './forms'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleAdvancedSearch: false,
    }
    this.toggleSearchComponent = this.toggleSearchComponent.bind(this)
  }

  toggleSearchComponent() {
    this.setState(state => ({
      toggleAdvancedSearch: !state.toggleAdvancedSearch,
    }))
  }

  renderButton() {
    const { toggleAdvancedSearch } = this.state
    const caption = toggleAdvancedSearch ? 'Simple search' : 'Advanced search'
    return (
      <Button color="link" size="sm" onClick={this.toggleSearchComponent}>
        {caption}
      </Button>
    )
  }

  render() {
    const { toggleAdvancedSearch } = this.state
    if (toggleAdvancedSearch) {
      return (
        <React.Fragment>
          {this.renderButton()}
          <AdvancedSearchForm />
        </React.Fragment>
      )
    }

    return (
      <div className="col-md-6 mx-auto">
        <SimpleSearchForm />
        {this.renderButton()}
      </div>
    )
  }
}

export default SearchForm
