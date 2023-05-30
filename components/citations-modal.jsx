import React, { Component } from 'react'
import { bind } from 'decko'

import styles from './styles.module.scss'
import { Button } from './elements'
import { CitationTab, CitationTabManager } from './citation-tabs'

const citationTitles = {
  text: 'Full citation',
  bibtex: 'BibTeX',
}

class CitationsModal extends Component {
  containerElement = null

  @bind
  handleCiteClick() {
    const controlElement = this.containerElement.querySelector(
      '.tab-pane.active textarea'
    )
    if (!controlElement) {
      throw new Error(
        'Something wrong happend whe you have tried to copy the citation text'
      )
    }
    controlElement.focus()
    controlElement.select()
    document.execCommand('copy')
    const { onCite } = this.props
    if (onCite) onCite(controlElement.value)
  }

  render() {
    const { id, citations, isOpen, onCite, onToggle, ...restProps } = this.props
    return (
      <div
        id={id}
        ref={(element) => {
          this.containerElement = element
        }}
        {...restProps}
      >
        <div className="sr-only">Cite the work</div>
        <div>
          <CitationTabManager>
            {Object.entries(citationTitles).map(([type, tabTitle]) => (
              <CitationTab
                key={type}
                id={`${id}-${type}`}
                type={type}
                title={tabTitle}
                content={citations[type]}
              />
            ))}
          </CitationTabManager>
          <div className={styles.actionBtn}>
            <Button color="primary" outline onClick={this.handleCiteClick}>
              Copy to clipboard
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default CitationsModal
