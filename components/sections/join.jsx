import React from 'react'

import { Button } from '../elements'
import Markdown from '../markdown'
import { Section } from '../content'
import styles from './join.module.scss'

const JoinSection = ({
  id,
  title,
  lead,
  actions,
  note,
  className = '',
  ...restProps
}) => (
  <Section
    id={id}
    className={`${styles.joinSection} ${className}`}
    {...restProps}
  >
    <h2>{title}</h2>
    <Markdown className={styles.joinSectionLead}>{lead}</Markdown>
    <p className={styles.buttonGroup}>
      {actions.map(({ url, caption }) => (
        <Button className={styles.button} size="lg" href={url}>
          {caption}
        </Button>
      ))}
    </p>
    <footer className={styles.joinSectionNote}>
      <Markdown>{note}</Markdown>
    </footer>
  </Section>
)

export default JoinSection
