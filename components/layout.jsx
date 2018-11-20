import React from 'react'
import { Container } from 'reactstrap'
import Head from 'next/head'

import Header from './header'
import Footer from './footer'

import siteMap from '../sitemap.yml'

const Layout = ({ children, container = false }) => (
  <React.Fragment>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>CORE</title>
    </Head>
    <Header siteMap={siteMap} />
    {container ? <Container>{children}</Container> : children}
    <Footer />
  </React.Fragment>
)

export default Layout
