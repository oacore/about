import React from 'react'

import PaymentPageTemplate from 'templates/member'
import { Page } from 'components'
import textData from 'data/payment.yml'
import { useStore } from 'store'

export const slugsPaymentPage = ['starting', 'supporting', 'sustaining']

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
  const paths = slugsPaymentPage.map((slug) => ({
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
  // Clear data.
  membership.reset()

  React.useEffect(() => {
    membership.setData({
      planName,
    })
  }, [])

  return (
    <Page title={textData.shortTitle} description={textData.caption}>
      <PaymentPageTemplate textData={textData} planName={planName} />
    </Page>
  )
}

export default PaymentPage
