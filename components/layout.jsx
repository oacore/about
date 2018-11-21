import React from 'react'
import { Container } from 'reactstrap'
import Head from 'next/head'

import Header from './header'
import Footer from './footer'

import config from '../core.config.yml'

const Layout = ({ children, container = false }) => (
  <React.Fragment>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>{config.name}</title>
      <meta name="description" content={config.description} />
    </Head>

    <Header siteMap={config.navigation} />
    {container ? <Container>{children}</Container> : children}
    <Footer links={config.footer} />
  </React.Fragment>
)

export default Layout
