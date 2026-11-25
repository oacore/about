import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ServicePage from '@components/pages'
import { TURNSTILE_SITE_KEY } from '@config/env'

import { loadRegistrationAssets } from '../loadRegistrationAssets'
import {
  getContentPageSlugs,
  isContentPageSlug,
  loadContentPage,
} from '../loadContentPage'

type ServiceContentPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () =>
  getContentPageSlugs().map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: ServiceContentPageProps): Promise<Metadata> => {
  const { slug } = await params

  if (!isContentPageSlug(slug)) {
    return {}
  }

  const page = await loadContentPage(slug)

  return {
    title: page.meta?.title,
    description: page.meta?.tagline,
    keywords: page.keywords,
  }
}

const ServiceContentPage = async ({ params }: ServiceContentPageProps) => {
  const { slug } = await params

  if (!isContentPageSlug(slug)) {
    notFound()
  }

  const isRegistrationProduct = slug === 'api' || slug === 'dataset'
  const [page, registrationAssets] = await Promise.all([
    loadContentPage(slug),
    isRegistrationProduct ? loadRegistrationAssets() : Promise.resolve(null),
  ])

  return (
    <ServicePage
      {...page}
      countries={registrationAssets?.countries}
      id={page.id ?? slug}
      registrationCopy={registrationAssets?.registration}
      turnstileSiteKey={TURNSTILE_SITE_KEY}
    />
  )
}

export default ServiceContentPage
