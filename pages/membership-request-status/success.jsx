import React from 'react'
// import { useRouter } from 'next/router'

import PaymentSuccessPageTemplate from 'templates/member/success'
import { Page } from 'components'
import textData from 'data/payment.yml'
// import { useStore } from 'store'

const PaymentSuccessPage = () => (
  // const { membership } = useStore()
  // const router = useRouter()
  // const [loaded, setLoaded] = React.useState(false)

  // React.useEffect(() => {
  //   if (membership.data.planName === '') router.push('/membership')
  //   else setLoaded(true)
  // }, [])
  //
  // if (!loaded) return <div />

  <Page title={textData.shortTitle} description={textData.caption}>
    <PaymentSuccessPageTemplate textData={textData.success} />
  </Page>
)

export default PaymentSuccessPage
