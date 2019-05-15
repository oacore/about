import React from 'react'
import { Page, Markdown, Content } from 'components'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import registerData from '../../data/services/register.yml'
import countriesData from '../../data/countries.yml'

const RegisterDiscovery = () => (
  <Page
    title={registerData.title}
    description={registerData.description}
    keywords={registerData.keywords}
    className="service-page"
    nav
  >
    <h1 className="service-page-title">{registerData.title}</h1>
    <p className="service-page-tagline">{registerData.tagline}</p>

    <Content className="service-page-content">
      <Markdown>{registerData.main}</Markdown>
    </Content>

    <Form>
      <FormGroup row>
        <Label for="discoveryEmail" sm={2}>
          Email
        </Label>
        <Col sm={10}>
          <Input
            type="email"
            name="email"
            id="discoveryEmail"
            placeholder="your@email.here"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="discoveryName" sm={2}>
          Name
        </Label>
        <Col sm={10}>
          <Input
            type="text"
            name="name"
            id="discoveryName"
            placeholder="Your Name"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="discoveryCountry" sm={2}>
          Country
        </Label>
        <Col sm={10}>
          <Input type="select" name="select" id="discoveryCountry">
            {countriesData.countries.map(({ title }) => (
              <option key={title}>
                <Markdown>{title}</Markdown>
              </option>
            ))}
            <option> other</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="discoveryInstitution" sm={2}>
          Institution
        </Label>
        <Col sm={10}>
          <Input
            type="text"
            name="name"
            id="discoveryInstitution"
            placeholder="Institution (optional)"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="discoveryInterest" sm={2}>
          Interest
        </Label>
        <Col sm={10}>
          <Input type="select" name="select" id="discoveryInterest">
            <option>cats</option>
            <option>dogs</option>
            <option>birds</option>
            <option>people</option>
            <option>other</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="discoveryOptin" sm={2}>
          Opt-in
        </Label>
        <Col sm={{ size: 10 }}>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="discoveryOptin" />
              We would like to keep in touch with you updating you about CORE
              and our work to support Open Science. We won’t give your email
              address to anybody else and we will use it with extreme caution.
            </Label>
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 2 }}>
          <Button color="primary" outline>
            Submit & Register
          </Button>
        </Col>
      </FormGroup>
    </Form>
  </Page>
)

export default RegisterDiscovery
