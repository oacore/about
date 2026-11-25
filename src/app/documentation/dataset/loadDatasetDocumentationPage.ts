import { cache } from 'react'

import { getSections } from 'content'

import type { DatasetDocumentationData } from '@features/Documentation/dataset/types'
import { getUniqueSectionId } from '@features/Documentation/dataset/utils'

export const loadDatasetDocumentationPage = cache(async (): Promise<DatasetDocumentationData> => {
  const data = (await getSections('dataset')) as DatasetDocumentationData

  if (data.latestInstruction) {
    data.latestInstruction = {
      ...data.latestInstruction,
      id: getUniqueSectionId(data.latestInstruction.id, data.datasetLatest?.id),
    }
  }

  return data
})
