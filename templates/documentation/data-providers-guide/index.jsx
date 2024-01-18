import React, { useEffect, useState } from 'react'
import {
  DocumentationMembership,
  DocumentationMembershipNav,
} from '@oacore/design/lib/modules'
import { useRouter } from 'next/router'

import { Layout } from '../../../design-v2/components'
import textData from '../../../data/dataProviders.yml'
import styles from './styles.module.scss'
import text from '../../../data/membership.yml'
import DocumentSelect from '../../../components/docs-select'

function normalizeHref(str) {
  const test = str.replace('#', '')
  return test.replace('_', '-')
}
const DataProviderDocs = ({ dataProviderDocs }) => {
  const [highlight, setHighlight] = useState()
  const [navActiveIndex, setNavActiveIndex] = useState(null)
  const [selectedOption, setSelectedOption] = useState(
    text.documentationSwitcher[0].title
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
        const n = dataProviderDocs?.items?.findIndex((item) => item.id === id)
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

  const handleButtonClick = () => {
    route.push('membership-documentation')
  }
  const handleSelectChange = (option) => {
    setSelectedOption(option)
    if (option === 'Membership Documentation') handleButtonClick()
  }

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
            ]}
            handleSelect={handleSelectChange}
            selectedOption={selectedOption}
          />
        </div>
      </div>
      <Layout className={styles.docsLayout}>
        <DocumentationMembership
          docs={dataProviderDocs?.items}
          highlight={highlight}
          setHighlight={setHighlight}
          imageSource
          docsTitle={text.documentationSwitcher[0].title}
          mulltyDocs
          nav={
            <DocumentationMembershipNav
              activeIndex={navActiveIndex}
              setNavActiveIndex={setNavActiveIndex}
              textData={textData}
              setHighlight={setHighlight}
              mulltyDocs
            />
          }
        />
      </Layout>
    </div>
  )
}

export default DataProviderDocs
