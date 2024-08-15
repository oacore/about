import React from 'react'

import MembershipPricesPageTemplate from 'templates/membership/prices'
import { Page } from 'components'
import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.includes('/images'))
      object[key] = ASSETS_BASE_URL + value
    else if (typeof value === 'object') setAssetsUrl(value)
  })
}

const getSections = async ({ ref } = {}) => {
  const page = await retrieveContent('membership', {
    ref,
    transform: 'object',
  })

  const sponsorship = await retrieveContent('sponsorship', {
    ref,
    transform: 'object',
  })

  setAssetsUrl(page)
  setAssetsUrl(sponsorship)

  return { page, sponsorship }
}

export const slugs = ['supporting', 'sustaining']

export async function getStaticProps({ params, previewData }) {
  const { slug } = params
  const ref = previewData?.ref
  const { page, sponsorship } = await getSections({ ref })

  const data = {
    header: {
      title: page.header.header.title,
      description: page.fee.fee.description[slug],
      subDescription: page.fee.fee.subDescription[slug],
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
