import React from 'react'

import styles from '../styles.module.scss'

import { Markdown } from 'components'

const DiagnosticHeader = ({ overline, title, description }) => (
  <header className={styles.diagnosticHeader}>
    <p className={styles.overline}>{overline}</p>
    <h1>{title}</h1>
    <Markdown>{description}</Markdown>
  </header>
)

export default DiagnosticHeader
