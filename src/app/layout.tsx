import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import type { ReactNode } from 'react'

import { fetchCoreStatistics } from '@/lib/statistics/fetchCoreStatistics'
import { patchStats } from '@utils/patchStats'

import SiteFrame from './SiteFrame'
import AppProviders from './providers'
import '@core/core-ui/styles'
import './globals.css'
import '@styles/theme.css'

// Defaults for pages without their own metadata (old about repo: data/core.yml + layout/head.jsx)
export const metadata: Metadata = {
  title: 'CORE',
  description:
    'CORE is a service provided by the Knowledge Media Institute, based at The Open University, United Kingdom.',
  icons: {
    shortcut: '/favicon/favicon-32px.png',
    icon: [
      { url: '/favicon/favicon-128px.png', type: 'image/png', sizes: '128x128' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

type RootLayoutProps = {
  children: ReactNode
}

// Header search placeholder, patched with live statistics like the old site (data/core.yml)
// The design-system header uses Roboto (the old site loaded it); self-hosted by next/font at build
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
})

const SEARCH_PLACEHOLDER = 'Search {{totalArticlesCount}} papers from around the world'

const loadSearchPlaceholder = async (): Promise<string> => {
  const statistics = await fetchCoreStatistics().catch(() => ({}))
  // Without statistics, drop the number rather than show a raw {{token}}
  return patchStats(SEARCH_PLACEHOLDER, statistics).replace(/\s*\{\{\w+\}\}/g, '')
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const searchPlaceholder = await loadSearchPlaceholder()

  return (
    <html className={roboto.variable} lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProviders>
          <SiteFrame searchPlaceholder={searchPlaceholder}>{children}</SiteFrame>
        </AppProviders>
      </body>
    </html>
  )
}

export default RootLayout
