import React, { useCallback } from 'react'
import { Header, Footer } from '@oacore/design'
import { useRouter } from 'next/router'

import Head from './head'
import SkipToContent from '../skip-to-content'

const Layout = ({ title, description, children, onNavigate }) => {
  const router = useRouter()
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
      {!(
        router.pathname.includes('membership-documentation') ||
        router.pathname.includes('data-providers-guide')
      ) && <Footer />}
    </>
  )
}

export default Layout
