import React from 'react'
import { useRouter } from 'next/router'

import { Page } from 'components'
import textData from 'data/payment.yml'
import PaymentPageTemplate from 'templates/payment'
import { useStore } from 'store'
import apiRequest from 'api'

const PaymentPage = ({ initialState }) => {
  const { membership } = useStore()
  const router = useRouter()

  // const [loaded, setLoaded] = React.useState(false)
  // React.useEffect(() => {
  //   if (membership.data.activePlan === '') router.push('/membership')
  //   else setLoaded(true)
  // }, [])

  // if (!loaded) return <div /> // show nothing or a loader

  return (
    <Page title={textData.shortTitle} description={textData.caption}>
      <PaymentPageTemplate textData={textData} />
    </Page>
  )
}

export default PaymentPage
