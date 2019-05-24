import React, { Component } from 'react'
import { Page, Content, Button } from 'components'
import { Form, FormGroup, FormText, Label, Input } from 'reactstrap'
import { bind } from 'decko'

import countries from 'data/countries.yml'
import context from 'data/registration.yml'

const FormField = ({ children, id, label, help, type, ...restProps }) => {
  const check = type === 'checkbox' || type === 'radio'
  const labelElement = (
    <Label key="label" for={id}>
      {label}
    </Label>
  )
  const inputElement = (
    <Input key="input" id={id} type={type} {...restProps}>
      {children}
    </Input>
  )
  const helpElement = help && <FormText>{help}</FormText>

  const elements = check
    ? [inputElement, labelElement]
    : [labelElement, inputElement]
  elements.push(helpElement)

  return (
    <FormGroup>
      {check ? <FormGroup check>{elements}</FormGroup> : elements}
    </FormGroup>
  )
}

const RegistrationFrom = ({
  id = 'registration-form',
  action,
  method = 'post',
  status,
  disabled,
  ...restProps
}) => {
  const createId = name => (id ? `${id}-name` : name)
  return (
    <Form
      method={method}
      action={action}
      disabled={disabled || status === 'pending'}
      {...restProps}
    >
      <FormField
        id={createId('name')}
        name="name"
        {...context.form.name}
        required
      />
      <FormField
        id={createId('email')}
        type="email"
        name="email"
        {...context.form.email}
        required
      />
      <FormField
        id={createId('country')}
        type="select"
        name="country"
        label={context.form.country.label}
        defaultValue=""
        required
      >
        <option value="" disabled>
          {context.form.country.placeholder}
        </option>
        {countries.countries.map(({ code, name }) => (
          <option key={code}>{name}</option>
        ))}
      </FormField>
      <FormField
        id={createId('institution')}
        name="institution"
        {...context.form.institution}
        required
      />
      <FormField
        id={createId('interests')}
        name="interests"
        {...context.form.interests}
      />
      <FormField type="checkbox" {...context.form.subscribe} defaultChecked />

      <Button>Register</Button>
    </Form>
  )
}

class RegisterPage extends Component {
  state = {
    status: 'none',
  }

  @bind
  async submitRegistration(event) {
    this.setState({ status: 'pending' })
    setTimeout(() => {
      this.setState(
        { status: 'done' },
        () => {
          console.log('done')
        },
        1000
      )
    }, 1000)

    console.log(event)
    event.preventDefault()
  }

  render() {
    const { status } = this.state
    return (
      <Page
        title={context.title}
        description={context.description}
        keywords={context.keywords}
      >
        <h1>{context.title}</h1>
        <p>{context.tagline}</p>

        <Content>
          <RegistrationFrom
            status={status}
            onSubmit={this.submitRegistration}
          />
        </Content>
      </Page>
    )
  }
}

export default RegisterPage
