import type { Metadata } from 'next'

import HomePage from './HomePage'
import { loadHomePage } from './home/loadHomePage'

const resolveKeywords = (keywords?: string): string[] | undefined => {
  if (!keywords) {
    return undefined
  }

  return keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
}

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadHomePage()

  return {
    title: page.title,
    description: page.description,
    keywords: resolveKeywords(page.keywords),
  }
}

const IndexPage = async () => {
  const page = await loadHomePage()

  return <HomePage page={page} />
}

export default IndexPage
