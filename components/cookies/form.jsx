import React, { useState, useCallback } from 'react'
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
}) => {
  const [checkBoxes, setCheckBoxes] = useState(
    Object.fromEntries(items.map(({ name, value }) => [name, value]))
  )

  const handleCheckboxChange = useCallback((event) => {
    const { name } = event.target
    setCheckBoxes((checkBoxesInner) => ({
      ...checkBoxesInner,
      [name]: !checkBoxesInner[name],
    }))
  }, [])

  return (
    <Card
      className={`card-body ${styles.cookiesForm} ${className}`}
      method={method}
      tag={Form}
      {...formProps}
    >
      <CardTitle tag="h4">{title}</CardTitle>
      {items.map(
        ({ id: cookieId, name, title: label, description, required }) => (
          <FormGroup key={name}>
            {!checkBoxes[name] && (
              // Preserve default checked since disabled inputs are not sent
              <input type="hidden" name={name} value="off" />
            )}
            <CustomInput
              id={`${id}-${cookieId}`}
              type="switch"
              name={name}
              label={label}
              defaultChecked={checkBoxes[name]}
              value="on"
              onChange={handleCheckboxChange}
              disabled={required}
            />
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
}

export default CookiesForm
