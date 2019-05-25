import React, { Component } from 'react'
import { Page, Content, Markdown, Button } from 'components'
import { Form, FormGroup, FormText, Label, Input } from 'reactstrap'

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

const VerifyForm = ({
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
        id={createId('hash')}
        name="hash"
        {...context.form.verify}
        required
      />

      <Button>Verify</Button>
    </Form>
  )
}

class VerifyPage extends Component {
  static async getInitialProps({ req }) {
    const params = new URL(`${req.headers.host}${req.url}`).searchParams
    const hash = params.get('hash')

    if (hash) {
      try {
        const apiUrl = 'https://api.core.ac.uk/internal/discovery/verify'
        const result = fetch(apiUrl).then(res => {
          if (res.ok) throw new Error('Error connecting to API')
          return res.json()
        })
        return {
          ...context.cases.userRegistered,
          ...result,
        }
      } catch (error) {
        return {
          ...context.cases.apiError,
          error: true,
        }
      }
    }

    return {
      ...context.cases.userRegistered,
    }
  }

  static verify(hash) {
    console.log(hash)
    return Promise.resolve()
  }

  componentDidMount() {
    const { hash } = this.props
    if (hash) VerifyPage.verify(hash).then(this.handleVerificationResponse)
  }

  handleVerificationSubmit(event) {
    event.preventDefault()

    const data = new FormData(event.target)
    const hash = data.get('hash')
    VerifyPage.verify(hash).then(this.handleVerificationResponse)
  }

  handleVerificationResponse(...args) {
    console.log(this, args)
  }

  render() {
    const { title, description, keywords, content, hash, verified } = this.props
    return (
      <Page title={title} description={description} keywords={keywords}>
        <h1>{title}</h1>

        <Content>
          <Markdown>{content}</Markdown>
          {!hash && !verified && <VerifyForm />}
        </Content>
      </Page>
    )
  }
}

export default VerifyPage
