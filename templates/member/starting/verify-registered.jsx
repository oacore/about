import React, { useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import Parser from 'html-react-parser'

import styles from '../styles.module.scss'
import { patchStats } from '../../../components/utils'
import Markdown from '../../../components/markdown'

/**
 * The repository already has a dashboard account. verify_registered.html.twig
 *
 * @param item
 * @param emailAdministrator
 * @param handleSubmitStarting
 * @returns {JSX.Element}
 * @constructor
 */
const VerifyRegisteredTemplate = ({
  item,
  emailAdministrator,
  handleSubmitStarting,
}) => {
  const [buttonText, setButtonText] = useState(item.button1.caption)
  const [buttonStyle, setButtonStyle] = useState(styles.btn)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const handleClick = (evt) => {
    setButtonText('Request sent')
    setButtonStyle(styles.btnSent)
    setButtonDisabled(true)
    handleSubmitStarting(evt)
  }

  return (
    <div>
      <h4 className={styles.caption}>{item.title}</h4>
      <div className={styles.innerWrapText}>
        <span className={styles.text}>{Parser(item.text1)}</span>
        <span className={styles.text}>
          <Markdown>{patchStats(item.text2, { emailAdministrator })}</Markdown>
        </span>
        <span className={styles.text}>{Parser(item.text3)}</span>
        <span className={styles.wrapBtn}>
          <Button
            variant="contained"
            className={buttonStyle}
            onClick={handleClick}
            disabled={buttonDisabled}
          >
            {buttonText}
          </Button>
        </span>
        <span className={styles.wrapBtn}>
          <Button
            variant="outlined"
            href={item.button2.url}
            className={styles.btn}
          >
            {item.button2.caption}
          </Button>
        </span>
      </div>
    </div>
  )
}

export default VerifyRegisteredTemplate
