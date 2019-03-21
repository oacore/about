import React from 'react'
import { CustomInput, Form, FormGroup, Card, CardTitle } from 'reactstrap'
import { Button } from '../elements'
import Markdown from '../markdown'

const CookiesForm = ({
  title,
  items,
  className = '',
  id = 'cookies-popup',
  itemDescriptionTitle = 'What are these?',
  submitCaption = 'Apply',
  optionalActions = null,
  ...formProps
}) => (
  <Card
    className={`card-body cookies-form ${className}`}
    tag={Form}
    {...formProps}
  >
    <CardTitle className="cookies-popup-title" tag="h4">
      {title}
    </CardTitle>
    {Object.entries(items).map(
      ([
        name,
        { default: defaultValue, value, required, title: label, description },
      ]) => (
        <FormGroup>
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
    <div className="cookies-form-actions">
      <Button color="primary">{submitCaption}</Button>
      {optionalActions}
    </div>
  </Card>
)

export default CookiesForm
