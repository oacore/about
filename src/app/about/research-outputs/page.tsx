import type { Metadata } from 'next'

import { ResearchOutputsPage } from '@features/research-outputs'

import { loadResearchOutputsPage } from './loadResearchOutputsPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadResearchOutputsPage()

  return {
    title: page.meta?.title ?? page.header?.header?.title,
    description: page.meta?.tagline,
  }
}

const ResearchOutputsRoutePage = async () => {
  const { page } = await loadResearchOutputsPage()

  return <ResearchOutputsPage data={page} />
}

export default ResearchOutputsRoutePage
