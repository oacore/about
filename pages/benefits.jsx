import React from 'react'

import BenefitstPageTemplate from '../design-v2/benefits'

import { Page } from 'components'
import benefitsData from 'data/benefits.yml'

const benefitsPage = () => (
  <Page
    title={benefitsData.title}
    description={benefitsData.description}
    keywords={benefitsData.keywords}
  >
    <BenefitstPageTemplate />
  </Page>
)

export default benefitsPage
