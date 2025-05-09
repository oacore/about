import React, { useRef } from 'react'

import styles from './styles.module.scss'
import { Button } from './elements'
import { CitationTab, CitationTabManager } from './citation-tabs'

const citationTitles = {
  text: 'Full citation',
  bibtex: 'BibTeX',
}

const CitationsModal = ({ id, citations, onCite, ...restProps }) => {
  const containerRef = useRef(null)

  const handleCiteClick = () => {
    const controlElement = containerRef.current?.querySelector(
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
    if (onCite) onCite(controlElement.value)
  }

  return (
    <div id={id} ref={containerRef} {...restProps}>
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
          <Button color="primary" outline onClick={handleCiteClick}>
            Copy to clipboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CitationsModal
