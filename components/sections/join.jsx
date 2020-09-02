import React from 'react'

import { Button } from '../elements'
import Markdown from '../markdown'
import { Section } from '../content'
import styles from './join.module.scss'

const JoinSection = ({
  id,
  title,
  lead,
  action,
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
    <p className={styles.joinSectionButtonContainer}>
      <Button className={styles.joinCoreButton} size="lg" href="~services">
        {action}
      </Button>
    </p>
    <footer className={styles.joinSectionNote}>
      <Markdown>{note}</Markdown>
    </footer>
  </Section>
)

export default JoinSection
