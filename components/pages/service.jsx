import React from 'react'
import { Markdown } from 'components'
import { Article, Section } from '../content'
import { Button } from '../elements'
import { KeyFeatureList, KeyFeature } from '../key-feature'
import Testimonial from '../testimonial'

import './service.scss'

const ServicePage = ({
  title,
  tagline,
  screenshot,
  features,
  relatedServices,
  description,
  testimonial,
  freePackage,
}) => (
  <Article nav>
    <h1>{title}</h1>
    <p className="service-page-tagline">{tagline}</p>

    <figure>
      <img
        className="img-fluid"
        src={screenshot.source}
        alt={`${title}'s screenshot`}
      />
      <figcaption className="text-center">
        <Markdown>{screenshot.caption}</Markdown>
      </figcaption>
    </figure>

    <KeyFeatureList className="pt-5">
      {features.map(feature => (
        <KeyFeature
          title={feature.title}
          icon={feature.picture}
          key={feature.title}
        >
          <h4>{feature.title}</h4>
          <Markdown>{feature.description}</Markdown>
        </KeyFeature>
      ))}
    </KeyFeatureList>

    <div className="service-page-content">
      <Markdown>{description}</Markdown>
    </div>

    <Testimonial {...testimonial} />

    <Section caption={freePackage.title} id="#what-is-included">
      <h2>{freePackage.title}</h2>
      <Markdown>{freePackage.description}</Markdown>
      <div className="text-center">
        <Button color="primary" outline href={freePackage.actions.primary.url}>
          {freePackage.actions.primary.caption}
        </Button>
        <Button
          color="primary"
          href={freePackage.actions.secondary.url}
          className="ml-2"
        >
          {freePackage.actions.secondary.caption}
        </Button>
      </div>
    </Section>

    <Section caption="You might be also interested in" id="related-services">
      <h2>You might be also interested in</h2>
      <KeyFeatureList className="pt-5">
        {relatedServices.map(service => (
          <KeyFeature
            title={service.title}
            icon={service.picture}
            key={service.title}
          >
            <h4>{service.title}</h4>
            <Markdown>{service.description}</Markdown>
          </KeyFeature>
        ))}
      </KeyFeatureList>
    </Section>
  </Article>
)

ServicePage.create = (pageContext, packageContext) => () => (
  <ServicePage freePackage={packageContext} {...pageContext} />
)

export default ServicePage
