import type { Metadata } from 'next'

import { ResearchPage } from '@features/governance'

import { loadResearchPage } from './loadResearchPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadResearchPage()

  return {
    title: page.header?.title,
    description: page.mission?.description,
  }
}

const ResearchRoutePage = async () => {
  const page = await loadResearchPage()

  return <ResearchPage data={page} />
}

export default ResearchRoutePage
