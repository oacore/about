import React, { useEffect, useMemo, useState } from 'react'
import { DocumentSelect } from '@oacore/design/lib/modules'
import { useRouter } from 'next/router'

import { Layout } from '../../../design-v2/components'
import styles from './styles.module.scss'
import text from '../../../data/membership.yml'
import DocumentationMembership from '../docsComponents/documentation-membership'
import DocumentationMembershipNav, {
  findNavHrefById,
} from '../docsComponents/documentation-membership-nav'
import flattenDocItems from '../docsComponents/flatten-doc-items'

const WORKS_API_REFERENCE_ID = 'works-api-search-works'
const API_DOCS_URL = '/api-docs-v3.html'
const WORKS_SECTION_MARKER = '<section class="tag-section" id="works">'

const extractWorksReferenceHtml = (html) => {
  const swaggerStyles = html.match(/<style>([\s\S]*?)<\/style>/)?.[1]
  const sectionStart = html.indexOf(WORKS_SECTION_MARKER)

  if (!swaggerStyles || sectionStart === -1) return null

  const nextSectionStart = html.indexOf(
    '<section class="tag-section"',
    sectionStart + WORKS_SECTION_MARKER.length
  )
  const mainEnd = html.indexOf('</main>', sectionStart)
  const sectionEnd = nextSectionStart === -1 ? mainEnd : nextSectionStart

  if (sectionEnd === -1) return null

  const section = html.slice(sectionStart, sectionEnd)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <base target="_blank">
    <style>
      ${swaggerStyles}

      body {
        background: #414141;
      }

      .tag-section {
        padding: 0 0 28px;
      }

      .tag-section > h2 {
        margin: 0 0 20px;
        color: #fff;
      }
    </style>
  </head>
  <body>
    ${section}
  </body>
</html>`
}

const ApiReferenceColumn = () => {
  const [html, setHtml] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(API_DOCS_URL)
      .then((response) => response.text())
      .then((content) => {
        if (!cancelled) setHtml(extractWorksReferenceHtml(content))
      })
      .catch(() => {
        if (!cancelled) setHtml(null)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <iframe
      className={styles.apiReferenceFrame}
      srcDoc={html || ''}
      title="Works API reference"
    />
  )
}

const ApiDocumentationPageTemplate = ({ docs, navigation }) => {
  const docItems = useMemo(() => flattenDocItems(docs?.items), [docs?.items])
  const [highlight, setHighlight] = useState()
  const [activeHashId, setActiveHashId] = useState()
  const [navActiveHref, setNavActiveHref] = useState(null)
  const [selectedOption, setSelectedOption] = useState(
    text.documentationSwitcher[2].title
  )
  const [showNavigator, setShowNavigator] = useState(false)

  const route = useRouter()
  const headerHeight = 56

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location
      const id = hash.substring(1)
      setActiveHashId(id)
      const element = document.getElementById(id)
      setTimeout(() => {
        if (element) {
          const rect = element.getBoundingClientRect()
          window.scrollTo({
            top: rect.top + window.scrollY - headerHeight,
            behavior: 'smooth',
            block: 'center',
          })
          const n = docItems.findIndex((item) => item.id === id)
          setHighlight(n)
          if (hash) setNavActiveHref(hash)
        }
      }, 100)
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [route.asPath, docItems])

  useEffect(() => {
    const id = route.query?.r
    if (id) {
      const href = findNavHrefById(navigation.navItems, id)
      if (href) setNavActiveHref(href)
    }
  }, [])

  const handleSelectChange = (option) => {
    setSelectedOption(option)
    if (option === 'CORE Data Provider’s Guide')
      route.push('data-providers-guide')
    if (option === 'Membership Documentation')
      route.push('membership-documentation')
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const worksApiReference =
    activeHashId === WORKS_API_REFERENCE_ID ? <ApiReferenceColumn /> : null

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setShowNavigator(true)
      else setShowNavigator(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <div className={styles.navWrapper}>
        <div className={styles.navTitle}>
          <span>CORE DOCUMENTATION:</span>
        </div>
        <div className={styles.selectWrapper}>
          <DocumentSelect
            list={[
              text.documentationSwitcher[0].title,
              text.documentationSwitcher[1].title,
              text.documentationSwitcher[2].title,
            ]}
            handleSelect={handleSelectChange}
            selectedOption={selectedOption}
          />
        </div>
      </div>
      <Layout className={styles.docsLayout}>
        {/*
          TODO: Using local DocumentationMembership and
          DocumentationMembershipNav components. Move back to the design system
          when done.
        */}
        <DocumentationMembership
          docs={docItems}
          highlight={highlight}
          setHighlight={setHighlight}
          docsTitle={navigation?.navTitle || 'CORE Graph API Documentation'}
          mulltyDocs
          videoIcon={text.videlogo}
          redirectLink={text?.redirectLink}
          showNavigator={showNavigator}
          handleScrollToTop={handleScrollToTop}
          tutorial={docs?.tutorial}
          tutorialIcon={text.tutorialIcon}
          sideColumn={worksApiReference}
          nav={
            <DocumentationMembershipNav
              activeHref={navActiveHref}
              setNavActiveHref={setNavActiveHref}
              textData={navigation}
              setHighlight={setHighlight}
              docItems={docItems}
              mulltyDocs
            />
          }
        />
      </Layout>
    </div>
  )
}

export default ApiDocumentationPageTemplate
