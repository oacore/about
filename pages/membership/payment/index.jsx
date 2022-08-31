import React from 'react'

import { Page } from 'components'
import textData from 'data/payment.yml'
import PaymentPageTemplate from 'templates/payment'

const PaymentPage = () => (
  <Page title={textData.shortTitle} description={textData.caption}>
    <PaymentPageTemplate textData={textData} />
  </Page>
)

export default PaymentPage
