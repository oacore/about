import React from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

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
  <Form action={action} method={method} onSubmit={onSubmit}>
    <Row>
      <Col xs="12" md="6" className="mb-3">
        <Field label="all of the words" name="all" />
        <Field label="exact phrase" name="exact" />
        <Field label="at least one of the words" name="one" />
        <Field label="without the words" name="without" />
        <FormGroup>
          <Label for="select">find those words</Label>
          <Input type="select" name="select" id="select">
            <option value="anywhere" selected>
              anywhere in the article
            </option>
            <option value="title">in the title</option>
            <option value="title-abstract">in the title and abstract</option>
          </Input>
        </FormGroup>
        {/* <p className="mb-0">Place on a page selection</p> */}
      </Col>
      <Col xs="12" md="6" className="mb-3">
        <Field label="Author" name="author" />
        <Field label="Publisher" name="publisher" />
        <Field label="Repository" name="repository" />
        <Field label="DOI" name="doi" />
        <FormGroup>
          <Label for="year">Year</Label>
          <div className="d-flex justify-content-between align-items-baseline">
            <span>
              <Field id="year" name="year-from" type="number" />
            </span>
            <span>—</span>
            <span>
              <Field name="year-to" type="number" />
            </span>
          </div>
        </FormGroup>
        {/* <p className="mb-0">Year range</p> */}
      </Col>
    </Row>

    <Button color="primary">Search</Button>
  </Form>
)

export default AdvancedSearchForm
