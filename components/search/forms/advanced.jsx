import React from 'react'
import { Row, Col, Button, FormGroup, Label, Input } from 'reactstrap'

const Field = ({ id, label, name, type, value, placeholder, onChange }) => (
  <FormGroup>
    {label && <Label for={id || name}>{label}</Label>}
    <Input
      type={type}
      name={name}
      value={value}
      id={id || name}
      placeholder={placeholder}
      onChange={onChange}
    />
  </FormGroup>
)

const AdvancedSearchForm = ({ action, method, onSubmit }) => (
  <form action={action} method={method} onSubmit={onSubmit}>
    <Row>
      <Col xs="12" md="6" className="mb-3">
        <Field label="all of the words" name="all" />
        <Field label="exact phrase" name="exact" />
        <Field label="at least one of the words" name="one" />
        <Field label="without the words" name="without" />
        <p className="mb-0">Place on a page selection</p>
      </Col>
      <Col xs="12" md="6" className="mb-3">
        <Field label="Author" name="author" />
        <Field label="Publisher" name="publisher" />
        <Field label="Repository" name="repository" />
        <Field label="DOI" name="doi" />
        <p className="mb-0">Year range</p>
      </Col>
    </Row>

    <Button color="primary">Search</Button>
  </form>
)

export default AdvancedSearchForm
