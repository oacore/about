import React from 'react'

import Advisory from '../../templates/governance/advisory'
import { getSections } from '../../hooks/retriveContent'

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const sections = await getSections('advisory', { ref })
  const data = {
    ...sections,
  }

  return {
    props: {
      data,
    },
  }
}

const AdvisoryPage = ({ data }) => <Advisory {...data} />

export default AdvisoryPage
