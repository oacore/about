'use client'

import { Button, Card } from 'antd'
import classNames from 'classnames'

import Markdown from '@components/Markdown/Markdown'
import type { DatasetAccentColor, DatasetCardData } from '@features/Documentation/dataset/types'
import { resolveActionHref } from '@features/Documentation/dataset/utils'

import styles from './styles.module.css'

export type DatasetCardProps = DatasetCardData & {
  accentColor?: DatasetAccentColor
}

const DatasetCard = ({
  title,
  caption,
  dataSizes = [],
  footer,
  license,
  note,
  action,
  accentColor,
}: DatasetCardProps) => (
  <article>
    <Card className={classNames(styles.card, accentColor && styles[accentColor])} title={title}>
      <div className={styles.cardContent}>
        <Markdown>{caption}</Markdown>
        {dataSizes.length ? (
          <ul className={styles.cardSizes}>
            {dataSizes.map((size) => (
              <li key={`${size.dataType}-${size.count}`}>
                <span className={classNames(styles.count, accentColor && styles[accentColor])}>
                  {size.count}
                </span>{' '}
                - {size.dataType}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <Markdown className={styles.cardFooter}>{footer}</Markdown>
    </Card>
    <Markdown className={classNames(styles.note, accentColor && styles[accentColor])}>{license}</Markdown>
    <Markdown className={classNames(styles.note, accentColor && styles[accentColor])}>{note}</Markdown>
    {action?.url ? (
      <Button
        aria-label={action.caption}
        className={classNames(styles.button, accentColor && styles[accentColor])}
        href={resolveActionHref(action.url)}
        type="primary"
      >
        {action.caption}
      </Button>
    ) : null}
  </article>
)

export default DatasetCard
