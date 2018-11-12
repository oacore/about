import React from 'react'
import SearchForm from './search'

import logoPath from './images/core-logo.png'


const Welcome = () => (
  <React.Fragment>
    <div className="mx-auto col-md-6">
      <img src={logoPath} alt="CORE" className="d-block mx-auto" />
      <p className="lead text-center">
        Seamless access to the world's biggest collection of open access research papers
      </p>
    </div>
    <SearchForm placeholder="Search over 100,000,000 articles" />
  </React.Fragment>
)


export default Welcome
