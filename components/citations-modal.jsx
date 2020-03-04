import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { bind } from 'decko'

import { Button } from './elements'
import ButtonToolbar from './button-toolbar'
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
      <Modal
        id={id}
        isOpen={isOpen}
        toggle={onToggle}
        innerRef={element => {
          this.containerElement = element
        }}
        {...restProps}
      >
        <ModalHeader className="sr-only" toggle={onToggle}>
          Cite the work
        </ModalHeader>
        <ModalBody>
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
          <ButtonToolbar>
            <Button color="primary" onClick={this.handleCiteClick}>
              Copy the citation
            </Button>
            <Button color="primary" outline onClick={onToggle}>
              Cancel
            </Button>
          </ButtonToolbar>
        </ModalBody>
      </Modal>
    )
  }
}

export default CitationsModal
