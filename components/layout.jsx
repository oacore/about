import React from 'react'
import { Container } from 'reactstrap'

import Header from './header'
import Footer from './footer'

const Layout = ({ children, container = false }) => (
  <React.Fragment>
    <Header />
    {container ? <Container>{children}</Container> : children}
    <Footer />
  </React.Fragment>
)

export default Layout
