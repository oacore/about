import React from 'react'
import { Button, Card } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

import { Markdown } from 'components'

const DatasetCard = ({
  title,
  caption,
  dataSizes,
  footer,
  license,
  note,
  action,
  accentColor,
}) => {
  const addAccentColor = (baseClassName) =>
    classNames.use(baseClassName, styles[accentColor])
  return (
    <article>
      <Card className={styles.card}>
        <Card.Title tag="h6" className={addAccentColor(styles.cardTitle)}>
          {title}
        </Card.Title>
        <div className={styles.cardContent}>
          <Markdown>{caption}</Markdown>
          <ul className={styles.cardSizes}>
            {dataSizes.map((size) => (
              <li key={`${size.dataType}-${size.count}`}>
                <span className={addAccentColor(styles.count)}>
                  {size.count}
                </span>{' '}
                - {size.dataType}
              </li>
            ))}
          </ul>
        </div>
        <Markdown className={styles.cardFooter}>{footer}</Markdown>
      </Card>
      <Markdown className={addAccentColor(styles.note)}>{license}</Markdown>
      <Markdown className={addAccentColor(styles.note)}>{note}</Markdown>
      <Button
        variant="outlined"
        className={addAccentColor(styles.button)}
        href={action.url}
      >
        {action.caption}
      </Button>
    </article>
  )
}

export default DatasetCard
