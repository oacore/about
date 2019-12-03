import React from 'react'
import { Form } from 'reactstrap'
import { Button } from '../elements'
import Markdown from '../markdown'

const CookiesPopup = ({
  title = 'We use cookies',
  body = '[Learn more](~cookies)',
  items,
  submitCaption = 'Accept',
  ...formProps
}) => (
  <Form className="cookies-popup" id="cookies-popup" {...formProps}>
    <div className="cookies-popup-body">
      <h4 className="cookies-popup-title">{title}</h4>
      <Markdown>{body}</Markdown>
    </div>
    <Button className="cookies-popup-button cookies-popup-button-accept">
      <span className="sr-only">{submitCaption}</span>
    </Button>
  </Form>
)

export default CookiesPopup
