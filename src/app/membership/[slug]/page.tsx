import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MembershipPricesPage } from '@features/membership'

import {
  getMembershipPlanSlugs,
  isMembershipPlanSlug,
  loadMembershipPricesPage,
} from '../loadMembershipPage'

type MembershipPlanPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () =>
  getMembershipPlanSlugs().map((slug) => ({ slug }))

export const generateMetadata = async ({
  params,
}: MembershipPlanPageProps): Promise<Metadata> => {
  const { slug } = await params

  if (!isMembershipPlanSlug(slug)) {
    return {}
  }

  const data = await loadMembershipPricesPage(slug)

  return {
    title: data.header.title,
    description: data.header.description,
  }
}

const MembershipPlanRoutePage = async ({ params }: MembershipPlanPageProps) => {
  const { slug } = await params

  if (!isMembershipPlanSlug(slug)) {
    notFound()
  }

  const data = await loadMembershipPricesPage(slug)

  return <MembershipPricesPage data={data} />
}

export default MembershipPlanRoutePage
