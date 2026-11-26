'use client'

import { Button, Typography } from 'antd'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import type { DatasetLatest as DatasetLatestData } from '@features/Documentation/dataset/types'
import { resolveActionHref } from '@features/Documentation/dataset/utils'

import DatasetSection from './section'

import styles from '../styles.module.css'

const { Title } = Typography

type DatasetLatestProps = {
  dataset?: DatasetLatestData
}

const DatasetLatest = ({ dataset }: DatasetLatestProps) => {
  if (!dataset) {
    return null
  }

  const box = dataset.box

  return (
    <DatasetSection accentColor="primary" fullWidth id={dataset.id} title={dataset.title}>
      {box ? (
        <div className={styles.boxWide}>
          {box.title ? (
            <Title className={styles.boxTitle} level={5}>
              {box.title}
            </Title>
          ) : null}
          {box.icon ? (
            <Image alt="" aria-hidden className={styles.boxIcon} height={64} src={box.icon} unoptimized width={64} />
          ) : null}
          {box.dataSizes?.length ? (
            <ul className={styles.sizes}>
              {box.dataSizes.map((size) => (
                <li key={`${size.count}-${size.dataType}`}>
                  <span className={styles.count}>{size.count} </span> - {size.dataType}
                </li>
              ))}
            </ul>
          ) : null}
          {box.actions?.map((action) => (
            <Button
              aria-label={action.caption}
              className={styles.button}
              href={resolveActionHref(action.url)}
              key={action.caption}
              target={action.target}
              type="primary"
            >
              {action.caption}
            </Button>
          ))}
          <Markdown className={styles.boxTextWrapper}>{box.text}</Markdown>
        </div>
      ) : null}
    </DatasetSection>
  )
}

export default DatasetLatest
