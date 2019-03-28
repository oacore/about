import React from 'react'
import { Button } from '../elements'
import Markdown from '../markdown'
import { Section } from '../content'

const JoinSection = ({
  id,
  title,
  lead,
  action,
  note,
  className = '',
  ...restProps
}) => (
  <Section id={id} className={`join-section ${className}`} {...restProps}>
    <h2>{title}</h2>
    <Markdown className="join-section-lead">{lead}</Markdown>
    <Button className="join-core-button" size="lg" href="~services">
      {action}
    </Button>
    <footer className="join-section-note">
      <Markdown>{note}</Markdown>
    </footer>
  </Section>
)

export default JoinSection
