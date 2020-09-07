import React, { Component } from 'react'
import { Alert, Spinner, TabPane, FormGroup, Input } from 'reactstrap'

import styles from './citation-tabs.module.scss'

class CitationTextLoader extends Component {
  state = {
    isLoading: true,
    citationText: '',
    errorText: '',
  }

  componentDidMount() {
    const { citationText } = this.state
    if (citationText == null) {
      this.setState({ isLoading: true })
      this.fetchCitation()
    }
  }

  fetchCitation() {
    const { doi, type, onLoad, onError } = this.props
    return fetch(`https://api.crossref.org/works/${doi}/transform/${type}`)
      .then((response) => {
        if (!response.ok)
          throw new Error('We cannot generate citation data for this article.')
        return response.text()
      })
      .then((citationText) =>
        this.setState(
          {
            citationText,
            isLoading: false,
          },
          () => {
            if (onLoad) onLoad(citationText)
          }
        )
      )
      .catch((error) =>
        this.setState(
          {
            errorText: error.message,
            isLoading: false,
          },
          () => {
            const { errorText } = this.state
            if (onError) onError(errorText)
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
          className={styles.citationTabSpinner}
        />
      )
    } else if (errorText) {
      children = (
        <Alert
          key="error-text"
          color="danger"
          className={styles.citationTabError}
        >
          {errorText}
        </Alert>
      )
    } else {
      const controlId = `${id}-citation-text-${type}`
      children = (
        <FormGroup key="citation-text" className={styles.citationTabFormGroup}>
          <label className="sr-only" htmlFor={controlId}>
            {title} text to copy
          </label>
          <Input
            className={styles.citationTabControl}
            type="textarea"
            value={citationText}
            id={controlId}
            readOnly
          />
        </FormGroup>
      )
    }

    return (
      <Tag className={styles.citationTab} {...restProps}>
        {children}
      </Tag>
    )
  }
}

export default CitationTextLoader
