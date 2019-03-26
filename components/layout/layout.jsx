import React, { Fragment } from 'react'
import { Container } from 'reactstrap'

import Head from './head'
import Header from '../header'
import Footer from '../footer'

const Layout = ({
  title,
  description,
  navigation,
  footer,
  searchConfig,
  showSearch,
  activeRoute,
  children,
  container = false,
}) => (
  <Fragment>
    <Head title={title} description={description} />

    <Header
      className="page-header"
      siteMap={navigation}
      searchFormProps={searchConfig}
      showSearch={showSearch}
      activeRoute={activeRoute}
    />
    {container ? <Container>{children}</Container> : children}
    <Footer className="page-footer" {...footer} />
  </Fragment>
)

export default Layout
