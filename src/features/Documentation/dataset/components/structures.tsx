'use client'

import { Collapsed, Section } from '@core/core-ui'
import { Typography } from 'antd'

import Markdown from '@components/Markdown/Markdown'
import type { DatasetStructures as DatasetStructuresData } from '@features/Documentation/dataset/types'

import styles from '../styles.module.css'

const { Title } = Typography

type DatasetStructuresProps = {
  structures?: DatasetStructuresData
}

const DatasetStructures = ({ structures }: DatasetStructuresProps) => {
  if (!structures) {
    return null
  }

  return (
    <Section id="structures">
      {structures.title ? (
        <Title className={styles.structureTitle} level={4}>
          {structures.title}
        </Title>
      ) : null}
      {structures.items?.map((structure) => (
        <Collapsed id={structure.id} key={structure.id} title={structure.title}>
          <Markdown className={styles.structureContent}>{structure.text}</Markdown>
          <Markdown className={styles.structureFields}>{structure.fields}</Markdown>
        </Collapsed>
      ))}
    </Section>
  )
}

export default DatasetStructures
