import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import Parser from 'html-react-parser'

import styles from '../styles.module.scss'
import { patchStats } from '../../../components/utils'
import Markdown from '../../../components/markdown'

/**
 * The repository does not have a Dashboard account, but we have an email.
 * Email to official email with organisations_free.html.twig
 *
 * @param item
 * @param emailAdministrator
 * @param handleSubmitStarting
 * @returns {JSX.Element}
 * @constructor
 */
const OrganisationsFeeTemplate = ({
  item,
  emailAdministrator,
  handleSubmitStarting,
}) => (
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
          className={styles.btn}
          onClick={handleSubmitStarting}
        >
          {item.button1.caption}
        </Button>
      </span>
      <span className={styles.text}>{Parser(item.text4)}</span>

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
export default OrganisationsFeeTemplate
