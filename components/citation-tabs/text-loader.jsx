import React, { Component } from 'react'
import { Alert, Spinner, TabPane, FormGroup, Input } from 'reactstrap'

class CitationTextLoader extends Component {
  state = {
    isLoading: true,
    citationText: '',
    errorText: '',
  }

  componentDidMount() {
    if (this.state.citationText == null) {
      this.setState({ isLoading: true })
      this.fetchCitation()
    }
  }

  fetchCitation() {
    const { doi, type, onLoad, onError } = this.props
    return fetch(`https://api.crossref.org/works/${doi}/transform/${type}`)
      .then(response => {
        if (!response.ok)
          throw new Error('We cannot generate citation data for this article.')
        return response.text()
      })
      .then(citationText =>
        this.setState(
          {
            citationText,
            isLoading: false,
          },
          () => {
            if (onLoad) onLoad(this.state.citationText)
          }
        )
      )
      .catch(error =>
        this.setState(
          {
            errorText: error.message,
            isLoading: false,
          },
          () => {
            if (onError) onError(this.state.errorText)
          }
        )
      )
  }

  render() {
    const {
      id,
      doi,
      type,
      title,
      onLoad,
      onError,
      tag: Tag = TabPane,
      ...restProps
    } = this.props
    const { errorText, citationText, isLoading } = this.state
    let children = null

    if (isLoading) {
      children = (
        <Spinner
          key="spinner"
          color="primary"
          className="citation-tab-spinner"
        />
      )
    } else if (errorText) {
      children = (
        <Alert key="error-text" color="danger" className="citation-tab-error">
          {errorText}
        </Alert>
      )
    } else {
      const controlId = `${id}-citation-text-${type}`
      children = (
        <FormGroup key="citation-text" className="citation-tab-form-group">
          <label className="sr-only" htmlFor={controlId}>
            {title} text to copy
          </label>
          <Input
            className="citation-tab-control"
            type="textarea"
            value={citationText}
            id={controlId}
            readOnly
          />
        </FormGroup>
      )
    }

    return (
      <Tag className="citation-tab" {...restProps}>
        {children}
      </Tag>
    )
  }
}

export default CitationTextLoader
