import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

import { Markdown } from 'components'
import { observe, useStore } from 'store'

const MembershipTable = observe(({ className, textData, type = 'details' }) => {
  const headerNames = textData.headers.map((header) => header.name).slice(1)
  const { membership } = useStore()

  const onSelectActivePlan = (price) => {
    membership.setData({ price })
  }

  const renderHeaders = () => (
    <tr>
      {textData.headers.map((header) => (
        <th key={header.name} className={styles.header}>
          <h6>{header.name}</h6>
          {header.defaultText && (
            <span className={styles.headerText}>{header.defaultText}</span>
          )}
          {header.caption && (
            <span className={styles.headerCaption}>{header.caption}</span>
          )}
          {header.action && (
            <Button
              className={styles.headerAction}
              variant="outlined"
              href={header.action.url}
            >
              {header.action.caption}
            </Button>
          )}
        </th>
      ))}
    </tr>
  )

  const renderPricesRows = () =>
    textData.rows.map((row) => (
      <tr key={row.title}>
        <td className={styles.cellPricesFirst}>
          <Markdown>{row.title}</Markdown>
          <Markdown>{row.caption}</Markdown>
        </td>
        {row.prices.map((price) => (
          <td
            key={price}
            className={classNames.use(styles.cell, styles.cellPrices, {
              [styles.cellPricesActive]: membership.data.price === price,
            })}
            role="gridcell"
            onClick={() => onSelectActivePlan(price)}
          >
            <span className={styles.caption}>
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                maximumSignificantDigits: 3,
              }).format(price)}
            </span>
          </td>
        ))}
      </tr>
    ))

  const renderDetailsRows = () =>
    textData.rows.map((row) => (
      <tr key={row.title}>
        <td className={styles.cellDetailsFirst}>
          <Markdown className={styles.cellTitle}>{row.title}</Markdown>
          <Markdown className={styles.cellDescription}>
            {row.description}
          </Markdown>
        </td>
        {headerNames.map((name) => {
          const caption =
            row.captions && row.captions.find((item) => item.plan === name)

          return (
            <td key={name} className={styles.cell}>
              {row.plans && (
                <span
                  className={classNames.use(styles.box, {
                    [styles.checked]: row.plans.includes(name),
                    [styles.uncheked]: !row.plans.includes(name),
                  })}
                />
              )}
              {caption && (
                <span className={styles.caption}>{caption.name}</span>
              )}
            </td>
          )
        })}
      </tr>
    ))

  return (
    <div className={classNames.use(styles.container).join(className)}>
      <Markdown
        className={styles.title}
      >{`<h3>${textData.title}</h3>`}</Markdown>
      <div className={styles.divider} />
      <table
        className={classNames.use(styles.table, {
          [styles.fixed]: type === 'prices',
        })}
        role="grid"
      >
        <thead className={styles.head}>{renderHeaders()}</thead>
        <tbody>
          {type === 'details' && renderDetailsRows()}
          {type === 'prices' && renderPricesRows()}
        </tbody>
      </table>
    </div>
  )
})

export default MembershipTable
