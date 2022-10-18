import React from 'react'

import { Page } from 'components'
import textData from 'data/payment.yml'
import { ErrorTemplate } from 'design-v2/components'

const PaymentErrorPage = () => (
  <Page title={textData.shortTitle} description={textData.caption}>
    <ErrorTemplate text={textData.error} />
  </Page>
)

export default PaymentErrorPage
