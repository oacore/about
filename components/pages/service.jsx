import React from 'react'
import { Article, Content, Section } from '../content'
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
        <Content markdown>{screenshot.caption}</Content>
      </figcaption>
    </figure>

    <KeyFeatureList className="pt-5">
      {features.map(feature => (
        <KeyFeature
          title={feature.title}
          icon={feature.picture}
          key={feature.title}
        >
          <Content markdown>{feature.title}</Content>
        </KeyFeature>
      ))}
    </KeyFeatureList>

    <div className="service-page-content">
      <Content markdown>{description}</Content>
    </div>

    <Testimonial {...testimonial} />

    <Section caption={freePackage.title} id="#what-is-included">
      <h2>{freePackage.title}</h2>
      <Content markdown>{freePackage.description}</Content>
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

    <Section caption="You might also be interested in" id="related-services">
      <h2>You might also be interested in</h2>
      <KeyFeatureList className="pt-5">
        {relatedServices.map(service => (
          <KeyFeature
            title={service.title}
            icon={service.picture}
            key={service.title}
          >
            <Content markdown>{service.title}</Content>
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
