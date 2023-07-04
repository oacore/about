import React, { useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import Parser from 'html-react-parser'
import { TextField } from '@oacore/design/lib/elements/forms'

import styles from '../styles.module.scss'

/**
 // eslint-disable-next-line max-len
 * The repository does not have a Dashboard account, and we does not have an
 * email to send: verify_anonymous.html.twig
 *
 * @param item
 * @param handleSubmitStarting
 * @returns {JSX.Element}
 * @constructor
 */
const VerifyAnonymousTemplate = ({ item, handleSubmitStarting }) => {
  const [buttonText, setButtonText] = useState(item.button1.caption)
  const [buttonStyle, setButtonStyle] = useState(styles.btn)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [formValues, setFormValues] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }
  const handleClick = (evt) => {
    setButtonText('Request sent')
    setButtonStyle(styles.btnSent)
    setButtonDisabled(true)
    handleSubmitStarting({ evt, ...formValues })
  }

  return (
    <div>
      <h4 className={styles.caption}>{item.title}</h4>
      <div className={styles.innerWrapText}>
        <span className={styles.text}>{Parser(item.text1)}</span>
        <span className={styles.text}>{Parser(item.text2)}</span>
        <TextField
          id={item.fields.id}
          value={formValues[item.fields.id]}
          className={styles.textField}
          placeholder={item.fields.placeholder}
          name={item.fields.id}
          label={item.fields.label}
          required={1}
          onChange={handleInputChange}
        />
        {item.fields.appendTextBottom && (
          <span className={styles.inputAppendBottom}>
            {item.fields.appendTextBottom}
          </span>
        )}

        <span className={styles.text}>{Parser(item.text3)}</span>
        <span className={styles.text}>{Parser(item.text4)}</span>
        <Button
          variant="contained"
          className={buttonStyle}
          onClick={handleClick}
          disabled={buttonDisabled}
        >
          {buttonText}
        </Button>
        <Button
          variant="outlined"
          href={item.button2.url}
          className={styles.btn}
        >
          {item.button2.caption}
        </Button>
      </div>
    </div>
  )
}
export default VerifyAnonymousTemplate
