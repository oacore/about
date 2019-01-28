import React from 'react'
import { Button } from 'reactstrap'
import { Content, Section } from '../content'
import Link from '../link'

import './join.scss'

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
    <Content className="join-section-lead" markdown>
      {lead}
    </Content>
    <Link href="~join" passHref>
      <Button className="join-core-button" size="lg">
        {action}
      </Button>
    </Link>
    <footer className="join-section-note">
      <Content markdown>{note}</Content>
    </footer>
  </Section>
)

export default JoinSection
