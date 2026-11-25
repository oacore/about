import type { Metadata } from 'next'

import { SupportersPage } from '@features/governance'

import { loadSupportersPage } from './loadSupportersPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadSupportersPage()

  return {
    title: page.meta?.title,
    description: page.meta?.tagline,
  }
}

const SupportersRoutePage = async () => {
  const { page, members } = await loadSupportersPage()

  return <SupportersPage data={page} members={members} />
}

export default SupportersRoutePage
