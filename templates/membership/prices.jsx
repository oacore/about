import React, { useEffect } from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'
import DetailsTable from './details-table'

import { Markdown } from 'components'
import { patchStats } from 'components/utils'
import { Layout, MembershipTable, Section } from 'design-v2/components'
import { observe, useStore } from 'store'

const MembershipPricesPageTemplate = observe(({ data }) => {
  const { membership } = useStore()

  useEffect(() => {
    membership.setData({
      activePlan: data.plan,
    })
  }, [])

  return (
    <Layout>
      <Section id="meta" className={styles.headerPrices}>
        <h2 className={styles.title}>{data.header.title}</h2>
        <Markdown className={styles.description}>
          {data.header.description}
        </Markdown>
      </Section>
      <Section id="fee" className={styles.feeSection}>
        <MembershipTable
          textData={{
            ...data.fee.table,
            title: patchStats(data.fee.title, data),
          }}
          type="prices"
          className={styles.feeSectionTable}
        />

        <Button
          variant="contained"
          disabled={membership.data.activePlan === ''}
        >
          {data.fee.action.caption}
        </Button>
      </Section>
      <DetailsTable
        data={{
          box: data.box,
          comparisonTable: data.comparisonTable,
        }}
      />
    </Layout>
  )
})

export default MembershipPricesPageTemplate
