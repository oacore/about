import React from 'react'

import { Page } from 'components'
import { EndorsementsSection } from 'components/sections'
import { title, description, keywords, sections } from 'data/endorsements.yml'

const extractTestimonials = organizations =>
  organizations
    .filter(({ testimonial }) => testimonial != null)
    .filter(
      org => organizations.find(otherOrg => org.name === otherOrg.name) === org
    )
    .map(organization => ({
      ...organization.testimonial,
      organization,
    }))

const EndorsementsPage = () => (
  <Page title={title} description={description} keywords={keywords}>
    <h1>{title}</h1>

    {Object.entries(sections).map(
      ([key, { testimonials, organizations, ...section }]) => (
        <EndorsementsSection
          key={key}
          organizations={organizations.items}
          testimonials={{
            title: testimonials.title,
            items: [
              ...extractTestimonials(organizations.items),
              ...(testimonials.items || []),
            ],
          }}
          {...section}
        />
      )
    )}
  </Page>
)

export default EndorsementsPage
export { extractTestimonials }
