import type { Metadata } from 'next'

import { SdgPage } from '@features/sdg'

import { loadSdgPage } from './loadSdgPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadSdgPage()

  return {
    title: page.header?.header?.title,
    description: page.header?.header?.description,
  }
}

const SdgRoutePage = async () => {
  const page = await loadSdgPage()

  return <SdgPage data={page} />
}

export default SdgRoutePage
