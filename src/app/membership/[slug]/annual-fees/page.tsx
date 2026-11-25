import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MembershipAnnualFeesPage } from '@features/membership'

import {
  getMembershipPlanSlugs,
  isMembershipPlanSlug,
  loadMembershipAnnualFeesPage,
} from '../../loadMembershipPage'

type MembershipAnnualFeesRouteProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () =>
  getMembershipPlanSlugs().map((slug) => ({ slug }))

export const generateMetadata = async ({
  params,
}: MembershipAnnualFeesRouteProps): Promise<Metadata> => {
  const { slug } = await params

  if (!isMembershipPlanSlug(slug)) {
    return {}
  }

  const data = await loadMembershipAnnualFeesPage(slug)

  return {
    title: `Annual membership fees - ${data.header.planName}`,
    description: data.header.title,
  }
}

const MembershipAnnualFeesRoutePage = async ({ params }: MembershipAnnualFeesRouteProps) => {
  const { slug } = await params

  if (!isMembershipPlanSlug(slug)) {
    notFound()
  }

  const data = await loadMembershipAnnualFeesPage(slug)

  return <MembershipAnnualFeesPage data={data} />
}

export default MembershipAnnualFeesRoutePage
