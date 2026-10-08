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

const API_DOCS_URL = '/api-docs-v4.html'
const API_DOCS_MAIN_MARKER = '<main class="content">'
const API_REFERENCE_HASH_TAGS = ['authorships', 'affiliations', 'institutions']

const getApiReferenceTagId = (hash = '') => {
  const id = hash.replace(/^#/, '')

  return API_REFERENCE_HASH_TAGS.find((tag) => id.startsWith(`${tag}-`))
}

const scrollApiReferenceToTag = (frame, tagId) => {
  if (!frame || !tagId) return

  const doc = frame.contentDocument || frame.contentWindow?.document
  const target = doc?.querySelector(`.content #${tagId}`)

  if (!target) return

  frame.contentWindow?.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth',
  })
}

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

      .content {
        width: 100%;
        padding: 24px;
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
    <main class="content">
      ${content}
    </main>
  </body>
</html>`
}

const ApiReferenceColumn = ({ activeTagId }) => {
  const [html, setHtml] = useState(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const scrollTimer = window.setTimeout(() => {
      scrollApiReferenceToTag(frameRef.current, activeTagId)
    }, 100)

    return () => {
      window.clearTimeout(scrollTimer)
    }
  }, [activeTagId, html])

  useEffect(() => {
    let cancelled = false

    fetch(API_DOCS_URL)
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
  }, [])

  return (
    <iframe
      ref={frameRef}
      className={styles.apiReferenceFrame}
      onLoad={() => scrollApiReferenceToTag(frameRef.current, activeTagId)}
      srcDoc={html || ''}
      title="CORE API endpoint reference"
    />
  )
}

const ApiDocumentationPageTemplate = ({ docs, navigation }) => {
  const docItems = useMemo(() => flattenDocItems(docs?.items), [docs?.items])
  const [highlight, setHighlight] = useState()
  const [activeApiReferenceTagId, setActiveApiReferenceTagId] = useState()
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
      setActiveApiReferenceTagId(getApiReferenceTagId(hash))
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
          sideColumn={
            <ApiReferenceColumn activeTagId={activeApiReferenceTagId} />
          }
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
