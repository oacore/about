import React, { useCallback } from 'react'
import { Header, Footer } from '@oacore/design'

import Head from './head'
import SkipToContent from '../skip-to-content'

const Layout = ({ title, description, children, onNavigate }) => {
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
      <div id="content">{children}</div>

      <Footer />
    </>
  )
}

export default Layout
