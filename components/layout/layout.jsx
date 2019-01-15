import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import Head from 'next/head'

import Header from '../header'
import Footer from '../footer'

import './layout.scss'

// TODO: Move it to center configuration point
import config from '../../core.config.yml'

const Layout = ({ children, container = false }) => (
  <Fragment>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>{config.name}</title>
      <meta name="description" content={config.description} />
    </Head>

    <Header className="page-header" siteMap={config.navigation} />
    {container ? <Container>{children}</Container> : children}
    <Footer className="page-footer" {...config.footer} />
  </Fragment>
)

export default Layout
