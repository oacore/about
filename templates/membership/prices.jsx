import React, { useEffect } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'
import DetailsTable from './details-table'

import { Markdown } from 'components'
import { patchStats } from 'components/utils'
import { Layout, MembershipTable, Section } from 'design-v2/components'
import { observe, useStore } from 'store'

const MembershipPricesPageTemplate = observe(({ data }) => {
  const { membership } = useStore()
  const router = useRouter()

  useEffect(() => {
    membership.setData({
      planName: data.planName,
    })
  }, [])

  const handleClick = () => {
    router.push(data.fee.action.url)
  }

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
            caption: data.fee.caption,
          }}
          type="prices"
          className={styles.feeSectionTable}
        />
        <Markdown className={styles.feeSectionNote}>{data.fee.note}</Markdown>
        <Button
          type="button"
          variant="contained"
          onClick={handleClick}
          className={classNames.use(
            styles.button,
            membership.data.price === 0 && styles.disabled
          )}
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