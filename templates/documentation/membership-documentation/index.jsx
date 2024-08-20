import React, { useCallback, useEffect, useState } from 'react'
import {
  DocumentationMembership,
  DocumentationMembershipNav,
} from '@oacore/design/lib/modules'
import { useRouter } from 'next/router'

import { Layout, Video } from '../../../design-v2/components'
import styles from './styles.module.scss'
import text from '../../../data/membership.yml'
import DocumentSelect from '../../../components/docs-select'

function normalizeHref(str) {
  const test = str.replace('#', '')
  return test.replace('_', '-')
}

const DocumentationPageTemplate = ({ docs, navigation }) => {
  const [highlight, setHighlight] = useState()
  const [navActiveIndex, setNavActiveIndex] = useState(null)
  const [selectedOption, setSelectedOption] = useState(
    text.documentationSwitcher[1].title
  )
  const [visibleVideo, setVisibleVideo] = React.useState(null)
  const [showNavigator, setShowNavigator] = useState(false)

  const handleContentOpen = useCallback((condition) => {
    if (condition) setVisibleVideo(condition)
  }, [])

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
      const n = navigation.navItems.findIndex(
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
            ]}
            handleSelect={handleSelectChange}
            selectedOption={selectedOption}
          />
        </div>
      </div>
      <Layout className={styles.docsLayout}>
        <DocumentationMembership
          docs={docs?.items}
          handleContentOpen={handleContentOpen}
          highlight={highlight}
          setHighlight={setHighlight}
          docsTitle={text.documentationSwitcher[1].title}
          mulltyDocs
          videoIcon={text.videlogo}
          redirectLink={text?.redirectLink}
          showNavigator={showNavigator}
          handleScrollToTop={handleScrollToTop}
          nav={
            <DocumentationMembershipNav
              activeIndex={navActiveIndex}
              setNavActiveIndex={setNavActiveIndex}
              textData={navigation}
              setHighlight={setHighlight}
              mulltyDocs
            />
          }
        />
        {visibleVideo && (
          <Video
            visibleModal={visibleVideo}
            closeModal={() => setVisibleVideo(false)}
            video={visibleVideo}
          />
        )}
      </Layout>
    </div>
  )
}

export default DocumentationPageTemplate
