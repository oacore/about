'use client'

import { useEffect } from 'react'

import classNames from 'classnames'

import AnniversaryLogo from '@components/anniversary-logo'
import HistoryTimeline from '@components/history-timeline'
import { Layout, Section } from '@components/layout'
import type { HistoryPageData } from '@features/history/types'
import { patchStats } from '@utils/patchStats'

import styles from './styles.module.css'

type HistoryPageProps = {
  data: HistoryPageData
}

const HistoryPage = ({ data }: HistoryPageProps) => {
  const intro = patchStats(
    'Since [our start](#2010-09-01-initial-idea "Scroll down to the genesis beginning") 10\u00a0years ago, we collected {{totalArticlesCount}}\u00a0scientific outputs along with\u00a0{{fullTextCount}}\u00a0hosted documents bringing open science to everyone. None of this was achieved in a moment, but we have worked hard over the last 10\u00a0years. We are happy to share the story of us.',
    data.statistics,
  )

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) {
      return
    }

    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Layout className={styles.page}>
      <Section className={classNames(styles.hero, styles.blobsBackground)} id="history">
        {/* Page heading for screen readers and search engines, as on the old site */}
        <h1 className={styles.visuallyHidden}>CORE Genesis</h1>
        <AnniversaryLogo className={styles.heroLogo} />
      </Section>
      <HistoryTimeline className={styles.timeline} intro={intro} milestones={data.milestones} />
    </Layout>
  )
}

export default HistoryPage
