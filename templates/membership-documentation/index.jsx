import React, { useEffect, useState } from 'react'
import {
  DocumentationMembership,
  DocumentationMembershipNav,
} from '@oacore/design/lib/modules'
import { useRouter } from 'next/router'

import Markdown from '../../components/markdown'
import { Layout } from '../../design-v2/components'
import textData from '../../data/membership.yml'
// import DocumentationNav from '../membership/membershipDocumentationNav'

function normalizeHref(str) {
  const test = str.replace('#', '')
  return test.replace('_', '-')
}

const DocumentationPageTemplate = ({ headerAbout, docs }) => {
  const [highlight, setHighlight] = useState()
  const [navActiveIndex, setNavActiveIndex] = useState(null)
  const route = useRouter()
  useEffect(() => {
    const id = route.query?.r
    if (id) {
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      const n = docs.items.findIndex((item) => item.id === id)
      setHighlight(n)
    }
  }, [route.query])

  useEffect(() => {
    const id = route.query?.r
    if (id) {
      const n = textData.navItems.findIndex(
        (item) => normalizeHref(item.href) === id
      )
      setNavActiveIndex(n)
    }
  }, [])
  return (
    <Layout>
      <DocumentationMembership
        headerTitle={headerAbout.header.title}
        headerCaption={<Markdown>{headerAbout.header.caption}</Markdown>}
        docs={docs}
        highlight={highlight}
        setHighlight={setHighlight}
        nav={
          <DocumentationMembershipNav
            activeIndex={navActiveIndex}
            setNavActiveIndex={setNavActiveIndex}
            textData={textData}
            setHighlight={setHighlight}
          />
        }
      />
    </Layout>
  )
}

export default DocumentationPageTemplate
