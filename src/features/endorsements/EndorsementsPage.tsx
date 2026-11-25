'use client'

import PageNav from '@components/PageNav'
import { Layout, Section } from '@components/layout'
import type { EndorsementsPageData } from '@features/endorsements/types'

import EndorsementsSection from './EndorsementsSection'

import styles from './styles.module.css'

type EndorsementsPageProps = {
  data: EndorsementsPageData
}

const EndorsementsPage = ({ data }: EndorsementsPageProps) => {
  const navLinks = data.sections.flatMap((section) => {
    const title = section.caption ?? section.title

    if (!title) {
      return []
    }

    return [{ href: section.id, title }]
  })

  return (
    <Layout>
      <Section className={styles.titleSection}>
        {data.title ? <h1 className={styles.pageTitle}>{data.title}</h1> : null}
      </Section>
      {data.sections.map((section, index) => (
        <EndorsementsSection key={section.id} priority={index === 0} section={section} />
      ))}
    </Layout>
  )
}

export default EndorsementsPage
