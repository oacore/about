import React from 'react'
import { Button } from 'reactstrap'
import { SimpleSearchForm, AdvancedSearchForm} from './forms'


class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleAdvancedSearch: false,
    }
    this.toggleSearchComponent = this.toggleSearchComponent.bind(this)
  }

  toggleSearchComponent(event) {
    this.setState({ toggleAdvancedSearch: !this.state.toggleAdvancedSearch })
  }

  renderButton() {
    const caption = this.state.toggleAdvancedSearch
      ? 'Simple search'
      : 'Advanced search'
    return (
      <Button color="link" size="sm" onClick={this.toggleSearchComponent}>
        {caption}
      </Button>
    )
  }

  renderSearchComponent() {
    return this.state.toggleAdvancedSearch
      ? <AdvancedSearchForm />
      : <SimpleSearchForm />
  }

  render() {
    const { toggleAdvancedSearch } = this.state

    return (
      <React.Fragment>
        {toggleAdvancedSearch && this.renderButton()}
        {this.renderSearchComponent()}
        {!toggleAdvancedSearch && this.renderButton()}
      </React.Fragment>
    )
  }
}


export default SearchForm
