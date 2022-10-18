import React from 'react'

import PaymentErrorPage from './error'
import PaymentSuccessPage from './success'

import { Page } from 'components'
import textData from 'data/payment.yml'
import PaymentPageTemplate from 'templates/payment'
import { useStore } from 'store'

export const slugs = [
  'starting',
  'supporting',
  'sustaining',
  'success',
  'error',
]

export async function getStaticProps({ params }) {
  const { slug } = params

  const data = {
    planName: slug,
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

const PaymentPage = ({ data }) => {
  const { membership } = useStore()
  const { planName } = data
  if (planName === 'success') return <PaymentSuccessPage />
  if (planName === 'error') return <PaymentErrorPage />

  React.useEffect(() => {
    membership.setData({
      planName,
    })
  }, [])

  return (
    <Page title={textData.shortTitle} description={textData.caption}>
      <PaymentPageTemplate textData={textData} />
    </Page>
  )
}

export default PaymentPage
