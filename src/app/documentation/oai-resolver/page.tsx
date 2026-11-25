import type { Metadata } from 'next'

import { OaiResolverDocumentationPage } from '@features/Documentation/oai-resolver'

import { loadOaiResolverDocumentationPage } from './loadOaiResolverDocumentationPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { title, description } = await loadOaiResolverDocumentationPage()

  return { title, description }
}

const OaiResolverDocumentationRoutePage = async () => {
  const { header, blocks, faqItems } = await loadOaiResolverDocumentationPage()

  return <OaiResolverDocumentationPage blocks={blocks} faqItems={faqItems} header={header} />
}

export default OaiResolverDocumentationRoutePage
