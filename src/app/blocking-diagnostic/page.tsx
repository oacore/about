import type { Metadata } from 'next'

import { BlockingDiagnosticPage } from '@features/blocking-diagnostic'

import { loadBlockingDiagnosticPage } from './loadBlockingDiagnosticPage'

const resolveKeywords = (keywords: string | string[] | undefined): string[] | undefined => {
  if (!keywords) {
    return undefined
  }

  return Array.isArray(keywords) ? keywords : [keywords]
}

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadBlockingDiagnosticPage()

  return {
    title: page.meta?.title ?? page.header?.title,
    description: page.meta?.description ?? page.header?.description,
    keywords: resolveKeywords(page.meta?.keywords),
  }
}

const BlockingDiagnosticRoutePage = async () => {
  const page = await loadBlockingDiagnosticPage()

  return <BlockingDiagnosticPage data={page} />
}

export default BlockingDiagnosticRoutePage
