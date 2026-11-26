'use client'

import { Layout, PageNav } from '@core/core-ui'
import { useEffect } from 'react'

import Header from '@components/Header/Header'
import FaqSection from '@features/faq/FaqSection'
import type { FaqPageData } from '@features/faq/types'
const { Title } = Typography

import styles from './styles.module.css'
import {Typography} from 'antd';

type FaqPageProps = {
  data: FaqPageData
}

const FaqPage = ({ data }: FaqPageProps) => {
  const sections = data.sections ?? []

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) {
      return
    }

    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Layout>

      {/*<Header*/}
      {/*  className={styles.header}*/}
      {/*  hideButtons*/}
      {/*  id="faq"*/}
      {/*  metaClassName={styles.headerMeta}*/}
      {/*  title={data.title}*/}
      {/*/>*/}
      <h1 className={styles.mainTitle}>{data.title}</h1>
      <PageNav ariaLabel="FAQ sections" links={sections} />
      {sections.map((section) => (
        <FaqSection key={section.id} {...section} />
      ))}
    </Layout>
  )
}

export default FaqPage
