import type { Metadata } from 'next'

import { OaiResolverPage } from '@features/oai-resolver'

import { loadOaiResolverPage } from './loadOaiResolverPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadOaiResolverPage()

  return {
    title: page.title,
    description: page.description,
  }
}

const OaiResolverRoutePage = async () => {
  const page = await loadOaiResolverPage()

  return <OaiResolverPage data={page} />
}

export default OaiResolverRoutePage
