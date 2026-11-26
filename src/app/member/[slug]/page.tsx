import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MemberPage } from '@features/member'

import { getMemberPlanSlugs, isMemberPlanSlug, loadMemberPage } from '../loadMemberPage'

type MemberRoutePageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () => getMemberPlanSlugs().map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: MemberRoutePageProps): Promise<Metadata> => {
  const { slug } = await params

  if (!isMemberPlanSlug(slug)) {
    return {}
  }

  const data = await loadMemberPage(slug)

  return {
    title: data.shortTitle,
    description: data.caption,
  }
}

const MemberRoutePage = async ({ params }: MemberRoutePageProps) => {
  const { slug } = await params

  if (!isMemberPlanSlug(slug)) {
    notFound()
  }

  const data = await loadMemberPage(slug)

  return <MemberPage data={data} />
}

export default MemberRoutePage
