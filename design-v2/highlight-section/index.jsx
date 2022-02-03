import { Link } from '@oacore/design/lib/elements'
import React from 'react'

import styles from './highlight-section.module.scss'

const HighlightSection = ({ image, action, children }) => (
  <div className={styles.container}>
    <Link href={action} className={styles.highlightSection}>
      <img
        className={styles.highlightSectionPicture}
        src={image}
        alt=""
        role="presentation"
      />
    </Link>
    <div className={styles.textContainer}>{children}</div>
  </div>
)

export default HighlightSection
