import type { Metadata } from 'next'

import { LegalPage, TermsDescription } from '@features/legal'

import { loadTermsPage } from './loadTermsPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadTermsPage()

  return {
    title: page.header?.title,
    description:
      'Terms & Conditions under which CORE data can be used by others.',
  }
}

const TermsRoutePage = async () => {
  const { page } = await loadTermsPage()

  return (
    <LegalPage
      data={page}
      descriptionNode={<TermsDescription />}
      id="termsPage"
      navAriaLabel="Terms page sections"
    />
  )
}

export default TermsRoutePage
