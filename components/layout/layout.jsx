import React, { useCallback } from 'react'
import { Header } from '@oacore/design'

import Head from './head'
import Footer from '../footer'
import SkipToContent from '../skip-to-content'

const Layout = ({ title, description, footer, children, onNavigate }) => {
  const handleHeaderClick = useCallback(
    (event) => {
      const linkElement = event.target.closest('a')
      if (typeof onNavigate == 'function' && linkElement?.href != null) {
        event.preventDefault()
        onNavigate(linkElement?.href)
      }
    },
    [onNavigate]
  )

  return (
    <>
      <Head title={title} description={description} />
      <SkipToContent path="#content" caption="Skip to main content" />
      <Header id="header" onClick={handleHeaderClick} />
      <div id="content" />
      {children}
      <Footer className="page-footer" {...footer} />
    </>
  )
}

export default Layout
