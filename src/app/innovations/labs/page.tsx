import type { Metadata } from 'next'

import { LabsPage } from '@features/labs'

import { loadLabsPage } from './loadLabsPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadLabsPage()

  return {
    title: page.header?.header?.title,
    description: page.header?.header?.description,
  }
}

const LabsRoutePage = async () => {
  const page = await loadLabsPage()

  return <LabsPage data={page} />
}

export default LabsRoutePage
