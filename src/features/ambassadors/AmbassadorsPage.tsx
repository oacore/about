'use client'

import { Button } from 'antd'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'

import Markdown from '@components/Markdown/Markdown'
import ResourcesSection from '@components/ResourcesSection'
import TeamSection from '@components/TeamSection'
import { Layout, Section } from '@components/layout'
import type { OutreachLinkClickHandler } from '@components/outreach-materials'
import unknownQuestionMark from '@features/ambassadors/assets/unknown-question-mark.svg'
import {
  CONTACT_HREF,
  CONTACT_LABEL,
  JOIN_MEMBER_NAME,
  PEOPLE_SECTION_ID,
  RESOURCES_SECTION_ID,
} from '@features/ambassadors/constants'
import type { AmbassadorsPageData } from '@features/ambassadors/types'

import AmbassadorsMap from './AmbassadorsMap'

import styles from './styles.module.css'

type AmbassadorsPageProps = {
  data: AmbassadorsPageData
}

const reportOutreachClick: OutreachLinkClickHandler = ({ action, label }) => {
  if (!ReactGA.isInitialized) return

  ReactGA.event({ category: 'Outreach materials', action, label })
}

const AmbassadorsPage = ({ data }: AmbassadorsPageProps) => {
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, '')
      if (!hash) {
        return
      }

      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }

    handleScrollToHash()
    window.addEventListener('hashchange', handleScrollToHash)

    return () => {
      window.removeEventListener('hashchange', handleScrollToHash)
    }
  }, [])

  return (
    <Layout>
      <Section className={styles.hero}>
        {data.title ? <h1 className={styles.pageTitle}>{data.title}</h1> : null}
        {data.description ? <p className={styles.lead}>{data.description}</p> : null}
        <AmbassadorsMap members={data.mapMembers} regions={data.regions} />
      </Section>

      {data.content ? (
        <Section id="ambassadors-description">
          <Markdown className={styles.description}>{data.content}</Markdown>
        </Section>
      ) : null}

      <ResourcesSection
        id={RESOURCES_SECTION_ID}
        onLinkClick={reportOutreachClick}
        resources={data.resources}
        title={data.resourcesTitle}
      />
      <TeamSection
        equalHeight
        extraCard={{
          name: JOIN_MEMBER_NAME,
          picture: unknownQuestionMark,
          children: (
            <Button
              aria-label={CONTACT_LABEL}
              className={styles.contactButton}
              href={CONTACT_HREF}
              type="primary"
            >
              {CONTACT_LABEL}
            </Button>
          ),
        }}
        id={PEOPLE_SECTION_ID}
        members={data.members.map((member) => ({
          key: member.id,
          id: member.id,
          name: member.name,
          picture: member.picture,
          role: member.country,
        }))}
        title={data.ambassadorsTitle}
      />
    </Layout>
  )
}

export default AmbassadorsPage
