import React from 'react'
import { CustomInput, Form, FormGroup, Card, CardTitle } from 'reactstrap'

import { Button } from '../elements'
import ButtonToolbar from '../button-toolbar'
import Markdown from '../markdown'

const CookiesForm = ({
  title,
  items,
  className = '',
  id = 'cookies-form',
  itemDescriptionTitle = 'What are these?',
  submitCaption = 'Apply',
  optionalActions = null,
  method = 'post',
  ...formProps
}) => (
  <Card
    className={`card-body cookies-form ${className}`}
    method={method}
    tag={Form}
    {...formProps}
  >
    <CardTitle className="cookies-form-title" tag="h4">
      {title}
    </CardTitle>
    {Object.entries(items).map(
      ([
        name,
        { default: defaultValue, value, required, title: label, description },
      ]) => (
        <FormGroup key={name}>
          <CustomInput
            id={`${id}-${name}`}
            name={name}
            type="switch"
            label={label}
            defaultChecked={required ? defaultValue : value}
            disabled={required}
          />
          <details className="cookies-form-details">
            <summary>{itemDescriptionTitle}</summary>
            <Markdown>{description}</Markdown>
          </details>
        </FormGroup>
      )
    )}
    <ButtonToolbar className="cookies-form-actions">
      <Button color="primary">{submitCaption}</Button>
      {optionalActions}
    </ButtonToolbar>
  </Card>
)

export default CookiesForm
