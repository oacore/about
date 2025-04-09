import React from 'react'

import { getSections } from '../../hooks/retriveContent'

import { ServicePage } from 'design-v2/components'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const data = await getSections('consultancy', { ref })

  return {
    props: {
      data,
    },
  }
}

const ConsultancyPage = ({ data }) => {
  const Component = ServicePage.create(data)
  return <Component />
}

export default ConsultancyPage
