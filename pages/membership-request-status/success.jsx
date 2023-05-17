import React from 'react'
// import { useRouter } from 'next/router'

import { useStore } from 'store'
import PaymentSuccessPageTemplate from 'templates/member/success'
import { Page } from 'components'
import textData from 'data/payment.yml'

const PaymentSuccessPage = () => {
  const { membership } = useStore()
  // const router = useRouter()
  // const { typeRepository } = router.query ?? ''

  // console.log('getData ' + JSON.stringify(membership.getData()))

  // const [loaded, setLoaded] = React.useState(false)

  // React.useEffect(() => {
  //   if (membership.data.planName === '') router.push('/membership')
  //   else setLoaded(true)
  // }, [])
  //
  // if (!loaded) return <div />
  const handleSubmitStarting = ({ evt, roleInOrganisation }) => {
    evt.preventDefault()
    if (roleInOrganisation) membership.setData({ roleInOrganisation })
    membership.createMembershipPayment()
  }

  return (
    <Page title={textData.shortTitle} description={textData.caption}>
      <PaymentSuccessPageTemplate
        textData={textData.success}
        membership={membership.getData()}
        handleSubmitStarting={handleSubmitStarting}
      />
    </Page>
  )
}

export default PaymentSuccessPage
