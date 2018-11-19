import React from 'react'
import { Container } from 'reactstrap'

import Header from './header'
import Footer from './footer'

import siteMap from '../sitemap.yml'

const Layout = ({ children, container = false }) => (
  <React.Fragment>
    <Header siteMap={siteMap} />
    {container ? <Container>{children}</Container> : children}
    <Footer />
  </React.Fragment>
)

export default Layout
