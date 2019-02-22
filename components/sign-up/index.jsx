import React from 'react'

import { Col, Container, Row } from 'reactstrap'
import { Section } from '../content'
import { Button } from '../elements'

import signupData from '../../data/sign-up.yml'

import './sign-up.scss'

const SignUp = () => (
  <Container>
    <Section className="sign-up-section">
      <h2>{signupData.title}</h2>
      <Row>
        <Col sm="8">{signupData.content}</Col>
        <Col sm="4">
          <Button color="primary" href={`~join?service=${signupData.id}`}>
            Join CORE for free
          </Button>
          <Button color="primary" outline href={signupData.action.url}>
            {signupData.action.caption}
          </Button>
        </Col>
      </Row>
    </Section>
  </Container>
)

export default SignUp
