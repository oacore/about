import React, { useCallback, useEffect, useState } from 'react'
import { Video, DocumentSelect } from '@oacore/design/lib/modules'
import { useRouter } from 'next/router'

import { Layout } from '../../../design-v2/components'
import styles from './styles.module.scss'
import text from '../../../data/membership.yml'
import DocumentationMembershipNav, {
  findNavHrefById,
} from '../docsComponents/documentation-membership-nav'
import DocumentationMembership from '../docsComponents/documentation-membership'

const DataProviderDocs = ({ dataProviderDocs, navigation }) => {
  const [highlight, setHighlight] = useState()
  const [navActiveHref, setNavActiveHref] = useState(null)
  const [selectedOption, setSelectedOption] = useState(
    text.documentationSwitcher[0].title
  )
  const [showNavigator, setShowNavigator] = useState(false)
  const [visibleVideo, setVisibleVideo] = useState(null)

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
        const n = dataProviderDocs?.items?.findIndex((item) => item.id === id)
        setHighlight(n)
        if (hash) setNavActiveHref(hash)
      }
    }, 100)
  }, [route.asPath])

  useEffect(() => {
    const id = route.query?.r
    if (id) {
      const href = findNavHrefById(navigation.navItems, id)
      if (href) setNavActiveHref(href)
    }
  }, [])

  const handleSelectChange = (option) => {
    setSelectedOption(option)
    if (option === 'Membership Documentation')
      route.push('membership-documentation')
    if (option === 'CORE API Documentation') route.push('api-documentation')
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
        <DocumentationMembership
          docs={dataProviderDocs?.items}
          tutorial={dataProviderDocs?.tutorial}
          highlight={highlight}
          setHighlight={setHighlight}
          imageSource
          docsTitle={text.documentationSwitcher[0].title}
          mulltyDocs
          tutorialIcon={text.tutorialIcon}
          showNavigator={showNavigator}
          handleScrollToTop={handleScrollToTop}
          handleContentOpen={handleContentOpen}
          nav={
            <DocumentationMembershipNav
              activeHref={navActiveHref}
              setNavActiveHref={setNavActiveHref}
              textData={navigation}
              setHighlight={setHighlight}
              docItems={dataProviderDocs?.items}
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

export default DataProviderDocs
