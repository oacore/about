import React from 'react'
import SearchForm from './search'

import logoPath from './images/core-logo.png'

const Hero = ({ children, includeSearch = true }) => (
  <React.Fragment>
    <div className="mx-auto col-md-6">
      <img src={logoPath} alt="CORE" className="d-block mx-auto" />
      <p className="lead text-center">{children}</p>
    </div>

    {includeSearch &&
      <SearchForm placeholder="Search over 100,000,000 articles" />
    }
  </React.Fragment>
)


export default Hero
