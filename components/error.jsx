import React from 'react'

import Page from './page'
import ButtonToolbar from './button-toolbar'
import { Content } from './content'
import { Button } from './elements'

const ErrorPage = () => (
  <Page title="Page is not found">
    <h1>Uh-oh</h1>
    <Content>
      <p>The page you were looking for could not be found.</p>
      <p>To help you find what you are looking for, why not</p>
    </Content>
    <ButtonToolbar>
      <Button color="primary" href="~home">
        Go back to the homepage
      </Button>
      <Button color="primary" outline href="~contact">
        Contact us
      </Button>
    </ButtonToolbar>
  </Page>
)

export default ErrorPage
