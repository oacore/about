import React from 'react'
import { Article, Content, Section } from '../content'
import { KeyFeatureList, KeyFeature } from '../key-feature'
import Testimonial from '../testimonial'
import SignUp from '../sign-up'

import './service.scss'

const ServicePage = ({
  title,
  tagline,
  screenshot,
  features,
  relatedServices,
  description,
  testimonial,
}) => (
  <Article nav>
    <h1>{title}</h1>
    <p className="service-page-tagline">{tagline}</p>

    <figure className="text-center">
      <img
        className="img-fluid"
        src={screenshot.source}
        alt={`${title}'s screenshot`}
      />
      <figcaption>
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
          <h4>{feature.title}</h4>
          <Content markdown>{feature.description}</Content>
        </KeyFeature>
      ))}
    </KeyFeatureList>

    <div className="service-page-content">
      <Content markdown>{description}</Content>
    </div>

    <Testimonial {...testimonial} />

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
            <Content markdown>{service.description}</Content>
          </KeyFeature>
        ))}
      </KeyFeatureList>
    </Section>
    <SignUp />
  </Article>
)

ServicePage.create = (pageContext, packageContext) => () => (
  <ServicePage freePackage={packageContext} {...pageContext} />
)

export default ServicePage
