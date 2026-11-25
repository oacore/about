'use client'

import { Button } from 'antd'
import { useRouter } from 'next/navigation'

import { Layout, Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'
import MembershipDetailsTable from '@features/membership/MembershipDetailsTable'
import MembershipTable from '@features/membership/MembershipTable'
import type { MembershipPricesPageData } from '@features/membership/types'
import { patchStats } from '@utils/patchStats'

import styles from './styles.module.css'

type MembershipPricesPageProps = {
  data: MembershipPricesPageData
}

const MembershipPricesPage = ({ data }: MembershipPricesPageProps) => {
  const router = useRouter()

  const handleBecomeMember = () => {
    if (data.googleForm) {
      router.push(data.googleForm)
    }
  }

  const tableData = {
    headers: data.fee.table.headers,
    rows: data.fee.table[data.planName]?.rows ?? [],
    title: data.fee.title,
    caption: data.fee.caption,
  }

  const statistics = { planName: data.planName }

  return (
    <Layout>
      <Section className={styles.headerPrices} id="meta">
        <h2 className={styles.pricesTitle}>{data.header.title}</h2>
        <Markdown className={styles.pricesDescription}>{data.header.description}</Markdown>
      </Section>

      {data.header.subDescription ? (
        <Markdown className={styles.subDescription}>{data.header.subDescription}</Markdown>
      ) : null}

      <Section className={styles.feeSection} id="fee">
        <MembershipTable
          className={styles.feeSectionTable}
          renderSpan
          statistics={statistics}
          textData={{
            ...tableData,
            title: patchStats(tableData.title, statistics),
          }}
          type="prices"
        />
        {data.header.note ? (
          <Markdown className={styles.feeSectionNote}>{data.header.note}</Markdown>
        ) : null}
        <Button className={styles.feeActionButton} onClick={handleBecomeMember} type="primary">
          {data.fee.action.caption}
        </Button>
      </Section>

      {data.box ? (
        <MembershipDetailsTable
          data={{
            box: data.box,
            comparisonTable: data.comparisonTable,
          }}
        />
      ) : null}
    </Layout>
  )
}

export default MembershipPricesPage
