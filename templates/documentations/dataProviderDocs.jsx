import React, { useEffect, useState } from 'react'
import {
  DocumentationMembership,
  DocumentationMembershipNav,
} from '@oacore/design/lib/modules'
import { useRouter } from 'next/router'

import { Layout } from '../../design-v2/components'
import textData from '../../data/dataProviders.yml'
import styles from './styles.module.scss'

function normalizeHref(str) {
  const test = str.replace('#', '')
  return test.replace('_', '-')
}
const DataProviderDocs = ({ items }) => {
  const [highlight, setHighlight] = useState()
  const [navActiveIndex, setNavActiveIndex] = useState(null)
  const route = useRouter()
  const headerHeight = 56

  useEffect(() => {
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
        const n = items?.items?.findIndex((item) => item.id === id)
        setHighlight(n)
      }
    }, 100)
  }, [route.asPath])

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
    <Layout className={styles.docsLayout}>
      <DocumentationMembership
        docs={items}
        highlight={highlight}
        setHighlight={setHighlight}
        imageSource
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

export default DataProviderDocs
