import React, { useEffect, useState } from 'react'
import {
  DocumentationMembership,
  DocumentationMembershipNav,
} from '@oacore/design/lib/modules'
import { useRouter } from 'next/router'

import { Layout } from '../../../design-v2/components'
import styles from './styles.module.scss'
import text from '../../../data/membership.yml'
import DocumentSelect from '../../../components/docs-select'

function normalizeHref(str) {
  const test = str.replace('#', '')
  return test.replace('_', '-')
}

const DocumentationPageTemplate = ({ docs }) => {
  const [highlight, setHighlight] = useState()
  const [navActiveIndex, setNavActiveIndex] = useState(null)
  const [selectedOption, setSelectedOption] = useState(
    text.documentationSwitcher[1].title
  )
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
        const n = docs.items.findIndex((item) => item.id === id)
        setHighlight(n)
      }
    }, 100)
  }, [route.asPath])

  useEffect(() => {
    const id = route.query?.r
    if (id) {
      const n = text.navItems.findIndex(
        (item) => normalizeHref(item.href) === id
      )
      setNavActiveIndex(n)
    }
  }, [])

  const handleButtonClick = () => {
    route.push('data-providers-guide')
  }

  const handleSelectChange = (option) => {
    setSelectedOption(option)
    if (option === 'CORE Data Provider’s Guide') handleButtonClick()
  }

  return (
    <Layout className={styles.docsLayout}>
      <div className={styles.navWrapper}>
        <div className={styles.navTitle}>
          <span>CORE DOCUMENTATION:</span>
        </div>
        <div className={styles.selectWrapper}>
          <DocumentSelect
            list={['CORE Data Provider’s Guide', 'Membership documentation']}
            handleSelect={handleSelectChange}
            selectedOption={selectedOption}
          />
        </div>
      </div>
      <DocumentationMembership
        docs={docs?.items}
        highlight={highlight}
        setHighlight={setHighlight}
        nav={
          <DocumentationMembershipNav
            activeIndex={navActiveIndex}
            setNavActiveIndex={setNavActiveIndex}
            textData={text}
            setHighlight={setHighlight}
          />
        }
      />
    </Layout>
  )
}

export default DocumentationPageTemplate
