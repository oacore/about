import React from 'react'
import { TabPane, FormGroup, Input } from 'reactstrap'

import styles from './citation-tabs.module.scss'

const CitationTab = ({ id, type, title, content, onRef, ...restProps }) => {
  const controlId = `${id}-control`
  return (
    <TabPane className={styles.citationTab} {...restProps}>
      <FormGroup key="citation-text" className={styles.citationTabFormGroup}>
        <label className="sr-only" htmlFor={controlId}>
          {title} text to copy
        </label>
        <Input
          ref={onRef}
          className={styles.citationTabControl}
          type="textarea"
          value={content}
          id={controlId}
          readOnly
        />
      </FormGroup>
    </TabPane>
  )
}

export default CitationTab
