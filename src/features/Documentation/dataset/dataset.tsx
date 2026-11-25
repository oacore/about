'use client'

import { Layout } from '@core/core-ui'
import {
  DatasetGroupSection,
  DatasetHeader,
  DatasetInstruction,
  DatasetLatest,
  DatasetStructures,
} from '@features/Documentation/dataset/components'
import type { DatasetDocumentationProps } from '@features/Documentation/dataset/types'

import styles from './styles.module.css'

const DatasetDocumentationPage = ({
  header,
  instruction,
  latestInstruction,
  datasetLatest,
  additionalDatasets,
  structures,
}: DatasetDocumentationProps) => {
  const [otherDatasets, archivedDatasets] = additionalDatasets?.items ?? []

  return (
    <Layout>
      <div className={styles.datasetWrapper}>
        <DatasetHeader header={header} />
        <DatasetLatest dataset={datasetLatest} />
        <DatasetInstruction instruction={latestInstruction} />
        <DatasetGroupSection group={archivedDatasets} />
        <DatasetInstruction instruction={instruction} />
        <DatasetStructures structures={structures} />
        <DatasetGroupSection group={otherDatasets} />
      </div>
    </Layout>
  )
}

export default DatasetDocumentationPage
