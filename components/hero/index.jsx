import React from 'react'
import { Container } from 'reactstrap'
import Logo from '../logo'
import SearchForm from '../search'

import './hero.scss'

const Hero = ({ children, includeSearch = true }) => (
  <div className="hero">
    <Container>
      <div className="mx-auto col-md-6">
        <Logo />
        <p className="lead text-center">{children}</p>
      </div>

      {includeSearch && (
        <SearchForm placeholder="Search over 100,000,000 articles" />
      )}
    </Container>
  </div>
)

export default Hero
