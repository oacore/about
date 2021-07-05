import React, { useCallback } from 'react'
import { Header } from '@oacore/design'
import { useRouter } from 'next/router'

import Head from './head'
import Footer from '../footer'
import FooterDesign2 from '../design-v2/footer'
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

  let footerBlock = <Footer className="page-footer" {...footer} />
  if (useRouter().route === '/benefits')
    footerBlock = <FooterDesign2 className="page-footer" {...footer} />

  return (
    <>
      <Head title={title} description={description} />
      <SkipToContent path="#content" caption="Skip to main content" />
      <Header id="header" onClick={handleHeaderClick} />
      <div id="content" />
      {children}
      {footerBlock}
    </>
  )
}

export default Layout
