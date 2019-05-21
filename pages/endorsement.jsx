import React from 'react'
import { Page, Testimonial } from 'components'
import endorsementData from 'data/endorsements.yml'

const EndorsementPage = () => (
  <Page
    title={endorsementData.title}
    description={endorsementData.description}
    keywords={endorsementData.keywords}
    className="service-page"
    nav
  >
    <h1>{endorsementData.title}</h1>

    {endorsementData.testimonials.map(testimonial => (
      <Testimonial
        className="m-md-5"
        key={testimonial.title}
        {...testimonial}
      />
    ))}
  </Page>
)

export default EndorsementPage
