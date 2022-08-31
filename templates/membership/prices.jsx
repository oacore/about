import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'
import DetailsTable from './details-table'

import { Markdown } from 'components'
import { Layout, MembershipTable, Section } from 'design-v2/components'

const MembershipPricesPageTemplate = ({ data }) => (
  <Layout>
    <Section id="meta" className={styles.headerPrices}>
      <h2 className={styles.title}>{data.header.title}</h2>
      <Markdown className={styles.description}>{data.fee.description}</Markdown>
    </Section>
    <Section id="fee" className={styles.feeSection}>
      {data.fee.tables.content.map((table) => (
        <MembershipTable
          key={table.id}
          textData={{
            ...table,
            caption: data.fee.caption,
            headers: data.fee.tables.headers,
          }}
          type="prices"
          className={styles.feeSectionTable}
        />
      ))}
      <Markdown className={styles.feeSectionNote}>{data.fee.note}</Markdown>
      <Button
        type="button"
        variant="contained"
        href={data.fee.action.url}
        tag="a"
        className={classNames.use(styles.button)}
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

export default MembershipPricesPageTemplate
