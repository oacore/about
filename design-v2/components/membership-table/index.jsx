import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

import { Markdown } from 'components'

const MembershipTable = ({ textData }) => {
  const headerNames = textData.headers.map((header) => header.name).slice(1)

  const renderHeaders = () => (
    <tr>
      {textData.headers.map((header) => (
        <th key={header.name} className={styles.header}>
          <h6>{header.name}</h6>
          {header.defaultText && (
            <span className={styles.headerText}>{header.defaultText}</span>
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

  const renderRows = () =>
    textData.rows.map((row) => (
      <tr key={row.title}>
        <td className={styles.row}>
          <Markdown tag="h6" className={styles.rowTitle}>
            {row.title}
          </Markdown>
          <Markdown className={styles.rowDescription}>
            {row.description}
          </Markdown>
        </td>
        {headerNames.map((name) => {
          const caption =
            row.captions && row.captions.find((item) => item.plan === name)

          return (
            <td key={name}>
              <span
                className={classNames.use(styles.box, {
                  [styles.checked]: row.plans.includes(name),
                  [styles.uncheked]: !row.plans.includes(name),
                })}
              />
              {caption && (
                <span className={styles.caption}>{caption.name}</span>
              )}
            </td>
          )
        })}
      </tr>
    ))

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{textData.title}</h3>
      <div className={styles.divider} />
      <table className={styles.table}>
        <thead className={styles.head}>{renderHeaders()}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  )
}

export default MembershipTable
