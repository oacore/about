import type { Metadata } from 'next'

import { HistoryPage } from '@features/history'

import { loadHistoryPage } from './loadHistoryPage'

export const metadata: Metadata = {
  title: 'CORE is 10 years old! Discover how we grew up',
  description: "The long story CORE. Small steps to become world's largest open access aggregator",
}

const HistoryRoutePage = async () => {
  const page = await loadHistoryPage()

  return <HistoryPage data={page} />
}

export default HistoryRoutePage
