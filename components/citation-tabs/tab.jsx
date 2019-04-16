import React from 'react'
import { TabPane, FormGroup, Input } from 'reactstrap'

const CitationTab = ({ id, type, title, content, onRef, ...restProps }) => {
  const controlId = `${id}-control`
  return (
    <TabPane className="citation-tab" {...restProps}>
      <FormGroup key="citation-text" className="citation-tab-form-group">
        <label className="sr-only" htmlFor={controlId}>
          {title} text to copy
        </label>
        <Input
          ref={onRef}
          className="citation-tab-control"
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
