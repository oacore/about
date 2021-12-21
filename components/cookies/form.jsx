import React, { useState, useCallback, useEffect } from 'react'
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
  onSubmit,
  ...formProps
}) => {
  const [checkBoxes, setCheckBoxes] = useState(
    Object.fromEntries(items.map(({ name, value }) => [name, value]))
  )
  const [isMounted, setMounted] = useState(false)

  // const [eventId, setEventId] = useState('cookies-essential')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCheckboxChange = useCallback((event) => {
    const { name } = event.target
    setCheckBoxes((checkBoxesInner) => ({
      ...checkBoxesInner,
      [name]: !checkBoxesInner[name],
    }))
  }, [])

  if (!isMounted) return null
  return (
    <Card
      className={`card-body ${styles.cookiesForm} ${className}`}
      tag={Form}
      {...formProps}
    >
      <CardTitle tag="h4">{title}</CardTitle>
      {items.map(
        ({
          id: cookieId,
          name,
          title: label,
          description,
          required,
          value,
        }) => {
          const isDisabled = required

          return (
            <FormGroup key={`${name}`}>
              {(!checkBoxes[name] || isDisabled) && (
                // Preserve default checked since disabled inputs are not sent
                <input
                  type="hidden"
                  name={name}
                  value={isDisabled ? 'on' : 'off'}
                />
              )}
              <CustomInput
                id={`${id}-${cookieId}`}
                type="switch"
                name={name}
                label={label}
                value="on"
                onChange={handleCheckboxChange}
                disabled={isDisabled}
                defaultChecked={value}
              />
              <details className={styles.cookiesFormDetails}>
                <summary>{itemDescriptionTitle}</summary>
                <Markdown>{description}</Markdown>
              </details>
            </FormGroup>
          )
        }
      )}
      <ButtonToolbar className="cookies-form-actions">
        <Button color="primary" onClick={onSubmit}>
          {submitCaption}
        </Button>
        {optionalActions}
      </ButtonToolbar>
    </Card>
  )
}

export default CookiesForm
