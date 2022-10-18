import React, {useEffect} from 'react'

import {Page} from 'components'
import textData from 'data/payment.yml'
import PaymentPageTemplate from 'templates/payment'
import {useStore} from 'store'
import PaymentErrorPage from "./error";
import PaymentSuccessPage from "./success";

export const slugs = ['starting', 'supporting', 'sustaining', 'success', 'error']

export async function getStaticProps({ params }) {
  const { slug } = params

  const data = {
    // header: {
    //   title: textData.header.title,
    //   description: textData.fee.description[slug],
    // },
    // fee: {
    //   ...textData.fee,
    //   table: {
    //     headers: textData.fee.table.headers,
    //     ...textData.fee.table[slug],
    //   },
    // },
    planName: slug,
    // comparisonTable: textData.comparisonTable,
    // box: textData.box,
    // discount: textData.discount,
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

const PaymentPage = ({data}) => {
  const {membership} = useStore()
  const { planName } = data
  if(planName === 'success')  return <PaymentSuccessPage />
  if(planName === 'error')  return <PaymentErrorPage />

  console.log("PaymentPage planName " + planName)

  React.useEffect(() => {
    membership.setData({
      planName
    })
  }, [])

  return (
    <Page title={textData.shortTitle} description={textData.caption}>
      <PaymentPageTemplate textData={textData}/>
    </Page>
  )
}

export default PaymentPage
