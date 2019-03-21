import React from 'react'
import { Button } from 'reactstrap'
import Markdown from '../markdown'
import { Section } from '../content'
import Link from '../link'

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
    <Link href="~services" passHref>
      <Button className="join-core-button" size="lg">
        {action}
      </Button>
    </Link>
    <footer className="join-section-note">
      <Markdown>{note}</Markdown>
    </footer>
  </Section>
)

export default JoinSection
