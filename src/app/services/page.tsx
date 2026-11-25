import { Layout } from '@core/core-ui'
import type { Metadata } from 'next'
import { cache } from 'react'

import Header from '@components/Header/Header'

import { loadServicesPage } from './loadServicesPage'
import ServicesPageContent from './components/ServicesPageContent'

const loadPage = cache(loadServicesPage)

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await loadPage()

  return {
    title: page.header?.header?.title,
    description: page.header?.header?.description,
  }
}

const ServicesPage = async () => {
  const page = await loadPage()

  return (
    <Layout>
      <Header
        description={page.header?.header?.description ?? page.meta?.tagline}
        image={page.header?.header?.hero}
        logoAlt={page.header?.header?.title}
        title={page.header?.header?.title}
      />
      <ServicesPageContent sections={page.services.sections} />
    </Layout>
  )
}

export default ServicesPage
