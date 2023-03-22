import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import Parser from 'html-react-parser'

import styles from '../styles.module.scss'
import { patchStats } from '../../../components/utils'
import Markdown from '../../../components/markdown'

/**
 // eslint-disable-next-line max-len
 * The repository does not have a Dashboard account, and we does not have an
 * email to send: verify_anonymous.html.twig
 *
 * @param item
 * @param emailAdministrator
 * @returns {JSX.Element}
 * @constructor
 */
const VerifyAnonymousTemplate = ({ item, emailAdministrator }) => (
  <div>
    <h4 className={styles.caption}>{item.title}</h4>
    <div className={styles.innerWrapText}>
      <span className={styles.text}>{Parser(item.text1)}</span>
      <span className={styles.text}>
        <Markdown>{patchStats(item.text2, { emailAdministrator })}</Markdown>
      </span>
      <span className={styles.text}>{Parser(item.text3)}</span>
      <span className={styles.text}>{Parser(item.text4)}</span>
      <Button
        variant="contained"
        href={item.button1.url}
        className={styles.btn}
      >
        {item.button1.caption}
      </Button>
      <Button variant="outlined" href={item.button2.url} className={styles.btn}>
        {item.button2.caption}
      </Button>
    </div>
  </div>
)
export default VerifyAnonymousTemplate
