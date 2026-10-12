import React, { useEffect, useMemo, useRef, useState } from 'react'
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

const API_DOCS_MAIN_MARKER = '<main class="content-swagger">'
const AFFILIATION_REFERENCE_URL =
  '/api-swagger/get-graph-v1-affiliations-affiliationid.html'
const AFFILIATION_ENDPOINT_MARKER = `##### API endpoint

\`\`\`
GET https://api.core.ac.uk/v4/affiliations/{affiliationId}
\`\`\``
const INSTITUTION_REFERENCE_URL =
  '/api-swagger/get-graph-v1-institutions-institutionid.html'
const INSTITUTION_ENDPOINT_MARKER = `##### API endpoint

\`\`\`
GET https://api.core.ac.uk/v4/institutions/{institutionId}
\`\`\``

const extractApiReferenceHtml = (html) => {
  const swaggerStyles = html.match(/<style>([\s\S]*?)<\/style>/)?.[1]
  const mainStart = html.indexOf(API_DOCS_MAIN_MARKER)

  if (!swaggerStyles || mainStart === -1) return null

  const contentStart = mainStart + API_DOCS_MAIN_MARKER.length
  const mainEnd = html.indexOf('</main>', contentStart)

  if (mainEnd === -1) return null

  const content = html.slice(contentStart, mainEnd)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <base href="/" target="_blank">
    <style>
      ${swaggerStyles}

      body {
        background: #fff;
      }

      .content-swagger {
        width: 100%;
        padding: 0;
      }

      .intro {
        padding-bottom: 20px;
      }

      h1 {
        font-size: 30px;
      }

      h2 {
        margin-top: 36px;
        font-size: 24px;
      }

      .endpoint {
        margin-bottom: 24px;
      }

      .description {
        max-width: none;
      }

      .sample-block,
      .sample-empty {
        max-width: none;
      }
    </style>
  </head>
  <body>
    <main class="content-swagger">
      ${content}
    </main>
  </body>
</html>`
}

const InlineApiReference = ({ url, title }) => {
  const [html, setHtml] = useState(null)
  const [height, setHeight] = useState(640)
  const frameRef = useRef(null)

  const updateHeight = () => {
    const doc =
      frameRef.current?.contentDocument ||
      frameRef.current?.contentWindow?.document

    if (!doc?.body) return

    setHeight(doc.body.scrollHeight)
  }

  useEffect(() => {
    let cancelled = false

    fetch(url)
      .then((response) => response.text())
      .then((content) => {
        if (!cancelled) setHtml(extractApiReferenceHtml(content))
      })
      .catch(() => {
        if (!cancelled) setHtml(null)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <iframe
      ref={frameRef}
      className={styles.inlineApiReferenceFrame}
      onLoad={updateHeight}
      srcDoc={html || ''}
      style={{ height }}
      title={title}
    />
  )
}

const ApiDocumentationPageTemplate = ({ docs, navigation }) => {
  const docItems = useMemo(() => flattenDocItems(docs?.items), [docs?.items])
  const [highlight, setHighlight] = useState()
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
          descriptionAddons={{
            'affiliations-api-affiliations-endpoints': {
              afterText: AFFILIATION_ENDPOINT_MARKER,
              render: () => (
                <InlineApiReference
                  title="CORE API GET /v4/affiliations/{affiliationId} endpoint reference"
                  url={AFFILIATION_REFERENCE_URL}
                />
              ),
            },
            'institutions-api-institutions-endpoints': {
              afterText: INSTITUTION_ENDPOINT_MARKER,
              render: () => (
                <InlineApiReference
                  title="CORE API GET /v4/institutions/{institutionId} endpoint reference"
                  url={INSTITUTION_REFERENCE_URL}
                />
              ),
            },
          }}
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
