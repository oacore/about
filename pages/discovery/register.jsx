import React, { Component } from 'react'
import { Page, Content, Button } from 'components'
import { Form, FormGroup, FormText, Label, Input, Alert } from 'reactstrap'
import { bind } from 'decko'
import Router from 'next/router'

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
        id={createId('countryCode')}
        type="select"
        // TODO: rename on backend name="country" to name="countryCode"
        // name="countryCode"
        name="country"
        label={context.form.country.label}
        defaultValue=""
        required
      >
        <option value="" disabled>
          {context.form.country.placeholder}
        </option>
        {countries.countries.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </FormField>
      <FormField
        id={createId('affiliation')}
        name="affiliation"
        {...context.form.institution}
        required
      />
      <FormField
        id={createId('interests')}
        name="interests"
        {...context.form.interests}
      />
      <FormField
        id={createId('subscribed')}
        type="checkbox"
        name="subscribed"
        {...context.form.subscribe}
        defaultChecked
      />

      <Button disabled={status === 'pending'}>Register</Button>
    </Form>
  )
}

class RegisterPage extends Component {
  state = {
    status: 'none',
    error: '',
  }

  @bind
  async submitRegistration(event) {
    event.preventDefault()

    this.setState({ status: 'pending' })

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    fetch('https://api.core.ac.uk/internal/discovery/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.ok) return res
        throw new Error(
          'Oops! An Error Occurred. Please contact our support: support@core.ac.co.uk'
        )
      })
      .then(res => res.json())
      .then(result => {
        if (result.violations) throw new Error(result.title)
        return result
      })
      .then(account => {
        const { id, emailVerified } = account
        console.log(account, id)
        Router.push(emailVerified ? '/discovery/complete' : '/discovery/verify')
      })
      .catch(error => {
        this.setState({ status: 'error', error: error.message })
        console.log(error)
        // this.setState(context.cases.apiError)
      })
  }

  render() {
    const { status, error } = this.state
    return (
      <Page
        title={context.title}
        description={context.description}
        keywords={context.keywords}
      >
        <h1>{context.title}</h1>
        <p>{context.tagline}</p>

        <Content>
          {error && <Alert color="primary"> {error} </Alert>}

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
