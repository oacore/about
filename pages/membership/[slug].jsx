import React from 'react'

import MembershipPricesPageTemplate from 'templates/membership/prices'
import textData from 'data/membership.yml'
import { Page } from 'components'

export const slugs = ['supporting', 'sustaining']

export async function getStaticProps({ params }) {
  const { slug } = params

  const data = {
    header: {
      title: textData.header.title,
      description: textData.header.description,
    },
    fee: {
      ...textData.fee,
      table: {
        headers: textData.fee.table.headers,
        ...textData.fee.table[slug],
      },
    },
    plan: slug,
    comparisonTable: textData.comparisonTable,
    box: textData.box,
  }

  return {
    props: {
      data,
    },
  }
}

export async function getStaticPaths() {
  const paths = slugs.map((slug) => ({
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
