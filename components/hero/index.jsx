import React from 'react'
import { Container } from 'reactstrap'
import Logo from '../logo'
import SearchForm from '../search'
import { Section } from '../content'

import './hero.scss'

const Hero = ({
  children,
  className = '',
  tag = 'div',
  includeSearch = true,
}) => (
  <Section className={`hero ${className}`} tag={tag}>
    <Container>
      <Logo className="hero-logo" />
      <p className="hero-text">{children}</p>

      {includeSearch && (
        <SearchForm placeholder="Search over 100,000,000 articles" />
      )}
    </Container>
  </Section>
)

export default Hero
