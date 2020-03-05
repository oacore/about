import React from 'react'
import { Container } from 'reactstrap'

import Head from './head'
import Header from '../header'
import Footer from '../footer'
import SkipToContent from '../skip-to-content'

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
  <>
    <Head title={title} description={description} />
    <SkipToContent path="#content" caption="Skip to main content" />
    <Header
      className="page-header"
      siteMap={navigation}
      searchFormProps={searchConfig}
      showSearch={showSearch}
      activeRoute={activeRoute}
    />
    <div id="content" />
    {container ? <Container>{children}</Container> : children}
    <Footer className="page-footer" {...footer} />
  </>
)

export default Layout
