import React from 'react'
import { CustomInput, Form, FormGroup, Card, CardTitle } from 'reactstrap'

import { Button } from '../elements'
import ButtonToolbar from '../button-toolbar'
import Markdown from '../markdown'
import styles from './cookies.module.scss'

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
    className={`card-body ${styles.cookiesForm} ${className}`}
    method={method}
    tag={Form}
    {...formProps}
  >
    <CardTitle className={styles.cookiesFormTitle} tag="h4">
      {title}
    </CardTitle>
    {items.map(
      ({
        id: cookieId,
        name,
        default: defaultValue,
        value,
        required,
        title: label,
        description,
      }) => (
        <FormGroup key={name}>
          <CustomInput
            id={`${id}-${cookieId}`}
            name={required ? null : name}
            type="switch"
            label={label}
            defaultChecked={required ? defaultValue : value ?? defaultValue}
            disabled={required}
          />
          {required && defaultValue && (
            // Preserve default checked since disabled inputs are not sent
            <input type="hidden" name={name} value="on" />
          )}
          <details className={styles.cookiesFormDetails}>
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
