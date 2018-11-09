import React from 'react'
import { Container } from 'reactstrap'

import Header from './header'
import Footer from './footer'

// Central Bootstrap style usage
// TODO: Move Bootstrap style import somewhere above
import 'bootstrap/scss/bootstrap.scss'


const Layout = ({ children, container = false }) => {
  const content = container ? (<Container>{children}</Container>) : children

  return (
    <React.Fragment>
      <Header />
      {content}
      <Footer />
    </React.Fragment>
  )
}


export default Layout
