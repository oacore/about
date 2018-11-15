import React from 'react'
import Logo from './logo'
import SearchForm from './search'

const Hero = ({ children, includeSearch = true }) => (
  <React.Fragment>
    <div className="mx-auto col-md-6">
      <Logo />
      <p className="lead text-center">{children}</p>
    </div>

    {includeSearch && (
      <SearchForm placeholder="Search over 100,000,000 articles" />
    )}
  </React.Fragment>
)

export default Hero
