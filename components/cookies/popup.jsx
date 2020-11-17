import React from 'react'
import { Form } from 'reactstrap'

import { Button } from '../elements'
import Markdown from '../markdown'
import styles from './cookies.module.scss'

const CookiesPopup = ({
  title = 'We use cookies',
  body = '[Learn more <span class="sr-only">about our cookie policy</span>](~cookies)',
  submitCaption = 'Accept',
  ...formProps
}) => (
  <Form className={styles.cookiesPopup} id="cookies-popup" {...formProps}>
    <div className={styles.cookiesPopupBody}>
      <h4 className={styles.cookiesPopupTitle}>{title}</h4>
      <Markdown>{body}</Markdown>
    </div>
    <Button
      className={`${styles.cookiesPopupButton} ${styles.cookiesPopupButtonAccept}`}
    >
      <span className="sr-only">{submitCaption}</span>
    </Button>
  </Form>
)

export default CookiesPopup
