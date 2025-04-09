import React from 'react'

import { getSections } from '../../hooks/retriveContent'

import { ServicePage } from 'design-v2/components'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const page = await getSections('dashboard', { ref })

  return {
    props: {
      page,
    },
  }
}

const ServicePageWrapper = ({ page }) => {
  const ServicePageComponent = ServicePage.create(page)
  return <ServicePageComponent />
}

export default ServicePageWrapper
