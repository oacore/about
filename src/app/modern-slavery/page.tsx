import type { Metadata } from 'next'

import { LegalPage } from '@features/legal'

import { loadModernSlaveryPage } from './loadModernSlaveryPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadModernSlaveryPage()

  return {
    title: page.header?.title,
    description: page.header?.description,
  }
}

const ModernSlaveryRoutePage = async () => {
  const { page } = await loadModernSlaveryPage()

  return (
    <LegalPage
      data={page}
      id="modernSlaveryPage"
      navAriaLabel="Modern slavery statement sections"
    />
  )
}

export default ModernSlaveryRoutePage
