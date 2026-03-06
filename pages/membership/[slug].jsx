import React from 'react'

import MembershipPricesPageTemplate from 'templates/membership/prices'
import { Page } from 'components'
import { getMembershipSections, membershipSlugs } from 'hooks/retriveContent'

export async function getStaticProps({ params, previewData }) {
  const { slug } = params
  const ref = previewData?.ref
  const { page, sponsorship } = await getMembershipSections({ ref })

  const data = {
    header: {
      title: page.header.header.title,
      description: page.fee.fee.description[slug],
      subDescription: page.fee.fee.subDescription?.[slug],
      note: page.fee.fee.note[slug],
    },
    fee: {
      ...page.fee.fee,
      table: {
        headers: page.fee.fee.table.headers,
        ...page.fee.fee.table[slug],
      },
    },
    planName: slug,
    comparisonTable: page.plan.table.comparisonTable,
    box: page.box.box,
    discount: sponsorship.discount.discount,
    googleForm: page.fee.fee.action.googleForm,
  }

  return {
    props: {
      data,
      page,
      sponsorship,
    },
  }
}

export async function getStaticPaths() {
  const paths = membershipSlugs.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

const MembershipPlanPage = ({ data }) => (
  <Page title={data.header.title} description={data.header.description}>
    <MembershipPricesPageTemplate data={data} />
  </Page>
)

export default MembershipPlanPage
