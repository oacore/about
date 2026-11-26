import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ConfirmRegistrationPage } from '@features/confirm-registration'

import { loadConfirmRegistrationPage } from '../confirm-registration/loadConfirmRegistrationPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadConfirmRegistrationPage()

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  }
}

const ConfirmRegistrationDatasetPage = async () => {
  const page = await loadConfirmRegistrationPage()

  if (!page.dataset) {
    notFound()
  }

  return <ConfirmRegistrationPage product={page.dataset} />
}

export default ConfirmRegistrationDatasetPage
