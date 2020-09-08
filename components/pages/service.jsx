import React from 'react'

import Collapsed from '../collapsed'
import Page from '../page'
import ButtonToolbar from '../button-toolbar'
import { Section, Content } from '../content'
import Markdown from '../markdown'
import { Button, Link } from '../elements'
import { KeyFeatureList, KeyFeature } from '../key-feature'
import Testimonial from '../testimonial'
import styles from './service.module.scss'

const ServicePage = ({
  id,
  title,
  tagline,
  features,
  description,
  main,
  keywords,
  whatIsIncluded,
  screenshot, // @optional
  additional, // @optional
  testimonial, // @optional
  documentation, // @optional
  relatedServices,
}) => (
  <Page
    title={title}
    description={description}
    keywords={keywords}
    className={styles.servicePage}
    nav
  >
    <h1 className={`${styles.servicePageTitle} display`}>{title}</h1>
    <p className={styles.servicePageTagline}>{tagline}</p>
    <Section tag="div">
      {screenshot && (
        <figure className={styles.servicePageScreenshot}>
          <img src={screenshot.source} alt={`${title}'s screenshot`} />
          {screenshot.caption && (
            <figcaption>
              <Markdown>{screenshot.caption}</Markdown>
            </figcaption>
          )}
        </figure>
      )}

      <KeyFeatureList className={styles.servicePageFeatures}>
        {features.map((feature) => (
          <KeyFeature
            title={feature.title}
            icon={feature.picture}
            key={feature.title}
          >
            <Markdown>{feature.description}</Markdown>
          </KeyFeature>
        ))}
      </KeyFeatureList>

      <Content className={styles.servicePageContent}>
        <Markdown>{main}</Markdown>

        {documentation && (
          <p>
            <Link href={/documentation/ + id}>
              {typeof documentation == 'string'
                ? documentation
                : 'Looking for documentation?'}
            </Link>
          </p>
        )}

        {additional && (
          <Collapsed id={`${id}-details`} title={additional.title}>
            <Markdown>{additional.content}</Markdown>
          </Collapsed>
        )}
      </Content>

      {testimonial && (
        <Testimonial
          className={`section ${styles.testimonial}`}
          {...testimonial}
        />
      )}
    </Section>

    {whatIsIncluded && (
      <Section caption={whatIsIncluded.title} id="what-is-included">
        <h2 className="display">{whatIsIncluded.title}</h2>
        <Content>
          <Markdown>{whatIsIncluded.content}</Markdown>
          {whatIsIncluded.actions && (
            <ButtonToolbar>
              {whatIsIncluded.actions.primary && (
                <Button
                  color="primary"
                  href={whatIsIncluded.actions.primary.url || '#'}
                  disabled={!whatIsIncluded.actions.primary.url}
                >
                  {whatIsIncluded.actions.primary.caption}
                </Button>
              )}
              {whatIsIncluded.actions.secondary && (
                <Button
                  color="primary"
                  outline
                  href={whatIsIncluded.actions.secondary.url || '#'}
                  disabled={!whatIsIncluded.actions.secondary.url}
                >
                  {whatIsIncluded.actions.secondary.caption}
                </Button>
              )}
            </ButtonToolbar>
          )}
        </Content>
      </Section>
    )}

    {relatedServices && relatedServices.length && (
      <Section caption="You might also be interested in" id="related-services">
        <h2 className={`${styles.servicePageHeading} display`}>
          You might also be interested in
        </h2>
        <KeyFeatureList>
          {relatedServices.map((service) => (
            <KeyFeature
              title={service.title}
              icon={service.picture}
              href={service.url}
              key={service.title}
            >
              <Markdown>{service.title}</Markdown>
            </KeyFeature>
          ))}
        </KeyFeatureList>
      </Section>
    )}
  </Page>
)

ServicePage.create = (pageContext) => () => <ServicePage {...pageContext} />

export default ServicePage
