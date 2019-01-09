import React from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import './contact-form.scss'

const defaultSubjects = [
  { value: 'join-core', label: 'Joining CORE' },
  { value: 'article-update', label: 'Article updates/removals' },
  { value: 'bugs-features', label: 'Bug report or feature request' },
  { value: 'other', label: 'Other' },
]

const ContactForm = ({
  action,
  method = 'post',
  subjects = defaultSubjects,
  onSubmit,
  onCancel,
  ...restProps
}) => (
  <Form action={action} method={method} {...restProps}>
    <FormGroup row>
      <Label for="contact-form-subject" sm="3" className="text-sm-right">
        Subject:
      </Label>
      <Col sm="9">
        <Input type="select" name="subject" id="contact-form-subject">
          <option disabled selected>
            Please choose a subject
          </option>
          {subjects.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </Input>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="contact-form-name" sm="3" className="text-sm-right">
        Your name:
      </Label>
      <Col sm="9">
        <Input type="text" name="name" id="contact-form-name" />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="contact-form-email" sm="3" className="text-sm-right">
        Your email:
      </Label>
      <Col sm="9">
        <Input type="email" name="email" id="contact-form-email" />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="contact-form-message" sm="3" className="text-sm-right">
        Your message:
      </Label>
      <Col sm="9">
        <Input
          type="textarea"
          name="message"
          id="contact-form-message"
          className="contact-form-message"
          placeholder="Please select a subject above before writing your message.&#10;This will help us to handle your message"
        />
      </Col>
    </FormGroup>
    <div className="text-right">
      <Button
        type="button"
        color="primary"
        outline
        className="mr-1"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit" color="primary" onClick={onSubmit}>
        Send
      </Button>
    </div>
  </Form>
)

ContactForm.defaultSubjects = defaultSubjects

export default ContactForm
