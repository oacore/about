import React from 'react'
import { Container } from 'reactstrap'
import Logo from '../logo'
import { Section } from '../content'

import './hero.scss'

const Hero = ({
  children,
  title = 'CORE',
  tagline = '',
  className = '',
  tag = 'div',
  ...restProps
}) => (
  <Section className={`hero ${className}`} tag={tag} {...restProps}>
    <Container>
      <Logo text={title} className="hero-logo" tag="h1" />
      {tagline && <p className="hero-tagline">{tagline}</p>}
    </Container>
    {children}
  </Section>
)

export default Hero
