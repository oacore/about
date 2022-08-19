import React from 'react'

import BenefitsPageTemplate from '../design-v2/benefits'

import { Page } from 'components'
import benefitsData from 'data/benefits.yml'

const benefitsPage = () => (
  <Page
    title={benefitsData.title}
    description={benefitsData.description}
    keywords={benefitsData.keywords}
  >
    <BenefitsPageTemplate />
  </Page>
)

export default benefitsPage
