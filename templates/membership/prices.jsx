import React, { useEffect } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'
import DetailsTable from './details-table'

import stylesMT from 'design-v2/components/membership-table/styles.module.scss'
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
    router.push(data.googleForm)
    // router.push(`/member/${data.planName}`)
  }

  const renderHeaders = () => (
    <tr>
      {data.discount.table.headers.map((header) => (
        <th
          key={header.name}
          className={classNames.use(stylesMT.header, stylesMT.boldText500)}
        >
          <Markdown className={stylesMT.headerTitle}>{header.name}</Markdown>
        </th>
      ))}
    </tr>
  )

  const renderDiscountsRows = () =>
    data.discount.table.rows.map((row) => (
      <tr key={row.title}>
        <td key={row.period} className={stylesMT.cell} role="gridcell">
          {row.period}
        </td>
        <td
          key={row.discount}
          className={classNames.use(stylesMT.cell, stylesMT.boldText700)}
          role="gridcell"
        >
          {row.discount}
        </td>
      </tr>
    ))

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
        <Markdown className={styles.feeSectionNote}>
          {data.header.note}
        </Markdown>
        <div className={stylesMT.tableCaption}>{data.discount.title}</div>
        <table className={classNames.use(stylesMT.table)} role="grid">
          <thead className={stylesMT.head}>{renderHeaders()}</thead>
          <tbody>{renderDiscountsRows()}</tbody>
        </table>

        <Markdown
          className={classNames.use(
            styles.feeSectionNote,
            styles.feeSectionNoteSecond
          )}
        >
          {data.fee.noteSecond}
        </Markdown>
        <Button
          type="button"
          variant="contained"
          onClick={handleClick}
          className={styles.button}
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
