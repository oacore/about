import React from 'react'
import Logo from '../logo'
import { Section } from '../content'

import './hero.scss'

const HeroSection = ({
  children,
  title = 'CORE',
  tagline = '',
  className = '',
  tag = 'div',
  ...restProps
}) => (
  <Section className={`hero ${className}`} tag={tag} {...restProps}>
    <Logo text={title} className="hero-logo" tag="h1" />
    {tagline && <p className="hero-tagline">{tagline}</p>}
    {children}
  </Section>
)

export default HeroSection
