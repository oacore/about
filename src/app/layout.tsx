import type { Metadata } from 'next'
import type { ReactNode } from 'react'

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

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body suppressHydrationWarning>
      <AppProviders>
        <SiteFrame>{children}</SiteFrame>
      </AppProviders>
    </body>
  </html>
)

export default RootLayout
