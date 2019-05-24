import React from 'react'
import { Page, Testimonial } from 'components/index'
import endorsementData from 'data/endorsements.yml'
import EndorsementsFilter from '../../../components/endorsements-filter'

const EndorsementPage = () => (
  <Page
    title={endorsementData.title}
    description={endorsementData.description}
    keywords={endorsementData.keywords}
    className="service-page"
    nav
  >
    <h1>{endorsementData.title}</h1>

    <EndorsementsFilter />

    {endorsementData.testimonials.map(testimonial => (
      <Testimonial key={testimonial.id} className="m-md-5" {...testimonial} />
    ))}
  </Page>
)

export default EndorsementPage
