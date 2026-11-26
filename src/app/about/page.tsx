import type { Metadata } from 'next'

import { AboutPage } from '@features/about'

import { loadAboutPage } from './loadAboutPage'

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadAboutPage()

  return {
    title: page.meta?.title ?? page.core?.title ?? 'About CORE',
    description: page.meta?.description ?? page.meta?.tagline ?? page.core?.description,
    keywords: page.meta?.keywords,
  }
}

const AboutRoutePage = async () => {
  const page = await loadAboutPage()

  return <AboutPage data={page} />
}

export default AboutRoutePage
