import type { Metadata } from 'next'

import { RefPage } from '@features/ref'

import { loadRefPage } from './loadRefPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const { page } = await loadRefPage()

  return {
    title: page.meta?.title ?? page.header?.header?.title,
    description: page.meta?.tagline,
  }
}

const RefRoutePage = async () => {
  const { page } = await loadRefPage()

  return <RefPage data={page} />
}

export default RefRoutePage
