import React from 'react'
import { Article } from 'components/content'
import EndorsementsSection from 'components/sections/endorsements'
import { title, sections } from 'data/endorsements.yml'

const extractTestimonials = organizations =>
  organizations
    .filter(({ testimonial }) => testimonial != null)
    .map(organization => ({
      ...organization.testimonial,
      organization,
    }))

const EndorsementsPage = () => (
  <Article title={title}>
    <h1>{title}</h1>

    {Object.entries(sections).map(
      ([key, { testimonials, organizations, ...section }]) => (
        <EndorsementsSection
          key={key}
          organizations={organizations.items}
          testimonials={{
            title: testimonials.title,
            items: extractTestimonials(organizations.items),
          }}
          {...section}
        />
      )
    )}
  </Article>
)

export default EndorsementsPage
export { extractTestimonials }
