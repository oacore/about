'use client'

import { InfoCircleFilled } from '@ant-design/icons'

import { Layout, Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'
import MembershipTable from '@features/membership/MembershipTable'
import type { MembershipAnnualFeesPageData } from '@features/membership/types'
import { patchStats } from '@utils/patchStats'

import styles from './styles.module.css'

type MembershipAnnualFeesPageProps = {
  data: MembershipAnnualFeesPageData
}

const MembershipAnnualFeesPage = ({ data }: MembershipAnnualFeesPageProps) => {
  const statistics = { planName: data.planName }

  return (
    <Layout>
      <Section className={`${styles.feeSection} ${styles.annualFeesSection}`} id="annual-fees">
        {data.fee.warning ? (
          <div className={styles.feeSectionWarning}>
            <InfoCircleFilled aria-hidden className={styles.feeSectionWarningIcon} />
            <Markdown className={styles.feeSectionWarningContent}>{data.fee.warning}</Markdown>
          </div>
        ) : null}

        <MembershipTable
          className={`${styles.feeSectionTable} ${styles.annualFeesTable}`}
          textData={{
            ...data.fee.table,
            title: patchStats(data.fee.title, statistics),
            caption:
              'Annual membership fees following the expiry of the initial 3-year or 5-year period',
          }}
          type="prices"
        />

        {data.fee.subNote ? (
          <Markdown className={styles.feeSectionNote}>{data.fee.subNote}</Markdown>
        ) : null}
      </Section>
    </Layout>
  )
}

export default MembershipAnnualFeesPage
