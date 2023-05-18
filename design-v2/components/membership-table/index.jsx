import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

import { Markdown } from 'components'
import { observe, useStore } from 'store'

const Price = ({ tag: Tag = 'span', price, className }) => (
  <Tag className={classNames.use(styles.price).join(className)}>
    {new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumSignificantDigits: 1,
      maximumSignificantDigits: 4,
    }).format(price)}
  </Tag>
)

const MembershipTable = observe(
  ({ className, headerAlignment, textData, type = 'details' }) => {
    const headerNames = textData.headers.map((header) => header.name).slice(1)
    const { membership } = useStore()

    const onSelectActivePlan = (price, size) => {
      membership.setData({ price, size })
    }

    const renderHeaders = () => (
      <tr>
        {textData.headers.map((header) => (
          <th
            key={header.name}
            className={classNames.use(styles.header, {
              [styles.headerActive]:
                membership.data.planName === header.name.toLowerCase(),
              [styles.headerEmpty]: header.name.length === 0,
            })}
          >
            <Markdown
              className={`${styles.headerTitle} ${
                type === 'details' && styles.headerTitleDetails
              }`}
            >
              {header.name}
            </Markdown>
            {header.defaultText && (
              <a className={styles.headerTextWrapper} href={header.url}>
                <Markdown className={styles.headerText}>
                  {header.defaultText}
                </Markdown>
                <span className={styles.headerStatus}>{header.status}</span>
              </a>
            )}
            {header.caption && (
              <span className={styles.headerCaption}>{header.caption}</span>
            )}
            {header.action &&
            membership.data.planName !== header.name.toLowerCase() ? (
              <Button
                className={styles.headerAction}
                variant="outlined"
                href={header.action.url}
              >
                {header.action.caption}
              </Button>
            ) : (
              <span className={styles.headerText}>{header.selectedText}</span>
            )}
          </th>
        ))}
      </tr>
    )

    const renderPricesRows = () =>
      textData.rows.map((row) => (
        <tr key={row.title}>
          <td className={styles.cellPricesFirst} align="center">
            <Markdown>{row.title}</Markdown>
            <Markdown className={styles.cellPricesFirstCaption}>
              {row.caption}
            </Markdown>
          </td>
          {row.prices.map(({ type: priceType, original, discount }) => (
            <td
              key={`${priceType}-${original}`}
              className={classNames.use(styles.cell, styles.cellPrices, {
                [styles.cellPricesActive]:
                  (membership.data.price === discount ||
                    membership.data.price === original) &&
                  membership.data.size === row.title,
              })}
              role="gridcell"
              onClick={() =>
                onSelectActivePlan(discount || original, row.title)
              }
            >
              <Price className={styles.price} price={original} />
            </td>
          ))}
        </tr>
      ))

    const renderDetailsRows = () =>
      textData.rows.map((row) => (
        <tr key={row.title}>
          <td
            className={classNames.use(styles.cellDetailsFirst, {
              [styles.cellBackGround]: !row.descriptionCardTable,
            })}
          >
            <Markdown
              className={classNames.use(styles.cellTitle, {
                [styles.cellPadding]: !row.descriptionCardTable,
              })}
            >
              {row.title}
            </Markdown>
            {row.descriptionCardTable ? (
              <Markdown className={styles.cellDescription}>
                {row.descriptionCardTable}
              </Markdown>
            ) : (
              <></>
            )}
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
          className={classNames.use(styles.title, {
            [styles.alignLeft]: headerAlignment,
          })}
        >{`<div class="${styles.lowerCase}">${textData.title}</div>`}</Markdown>
        <div className={styles.titleBorder} />
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
  }
)

export default MembershipTable
